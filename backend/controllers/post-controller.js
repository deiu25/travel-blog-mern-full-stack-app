import Post from "../models/Post.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// Add Post
export const addPost = async (req, res) => {
  const user = await User.findById(req.user._id);

  try {
    // Încărcați imaginile în Cloudinary și obțineți link-urile
    const imagesLinks = await Promise.all(
      req.files.map(async (file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve({
                  public_id: result.public_id,
                  url: result.secure_url,
                });
              }
            }
          );

          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
      })
    );

    req.body.images = imagesLinks;
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to upload images." });
  }

  req.body.user = user._id;

  const post = await Post.create(req.body);

  res.status(201).json({
    success: true,
    post,
  });
};

// Get All Posts
export const getAllPosts = async (req, res) => {
  let posts;
  try {
    posts = await Post.find().populate("user");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unexpected Error Occurred" });
  }

  return res.status(200).json({ posts });
};

// Get Post By Id
export const getPostById = async (req, res) => {
  const id = req.params.id;

  let post;

  try {
    post = await Post.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!post) {
    return res.status(404).json({ message: "No post found" });
  }
  return res.status(200).json({ post });
};

// Update Post
export const updatePost = async (req, res) => {
  const id = req.params.id;

  let post;

  try {
    post = await Post.findById(id);
  } catch (err) {
    return res.status(500).json({ error: "Unexpected error occurred" });
  }

  if (!post) {
    return res.status(404).json({ message: "No post found" });
  }

  // Upload new images to Cloudinary and get links
  let imagesLinks = post.images;
  if (req.files && req.files.length > 0) {
    try {
      imagesLinks = await Promise.all(
        req.files.map(async (file) => {
          return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { resource_type: "auto" },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve({
                    public_id: result.public_id,
                    url: result.secure_url,
                  });
                }
              }
            );

            streamifier.createReadStream(file.buffer).pipe(uploadStream);
          });
        })
      );
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to upload new images." });
    }

    // Delete old images from Cloudinary only if new ones were uploaded successfully
    try {
      await Promise.all(
        post.images.map(async (image) => {
          await cloudinary.uploader.destroy(image.public_id);
        })
      );
    } catch (err) {
      return res.status(500).json({ error: "Failed to delete old images" });
    }
  }

  // Update fields
  post.title = req.body.title || post.title;
  post.description = req.body.description || post.description;
  post.location = req.body.location || post.location;
  post.date = req.body.date || post.date;
  post.images = imagesLinks;

  // Save updated post
  try {
    const updatedPost = await post.save();
    return res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (err) {
    return res.status(500).json({ error: "Failed to update post" });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  const id = req.params.id;

  let post;

  try {
    post = await Post.findById(id);
  } catch (err) {
    return res.status(500).json({ error: "Unexpected error occurred" });
  }

  if (!post) {
    return res.status(404).json({ message: "No post found" });
  }

  // Delete images from Cloudinary
  try {
    await Promise.all(
      post.images.map(async (image) => {
        await cloudinary.uploader.destroy(image.public_id);
      })
    );
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete images" });
  }

  // Delete post from database
  try {
    await post.deleteOne();
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete post" });
  }

  return res.status(200).json({ message: "Post deleted successfully" });
};
