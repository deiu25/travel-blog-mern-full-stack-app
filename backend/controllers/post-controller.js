import Post from "../models/Post.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from 'streamifier';

// Add Post
export const addPost = async (req, res) => {
  const user = await User.findById(req.user._id);

  try {
    // Încărcați imaginile în Cloudinary și obțineți link-urile
    const imagesLinks = await Promise.all(req.files.map(async (file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                public_id: result.public_id,
                url: result.secure_url
              });
            }
          }
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    }));

    req.body.images = imagesLinks;
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to upload images." });
  }

  req.body.user = user._id

  const post = await Post.create(req.body);

  res.status(201).json({
    success: true,
    post
  })
}

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
  console.log('updatePost called');
  const id = req.params.id;
  const { title, description, location, image } = req.body;

  let post;

  try {
    console.log('findById called');
    post = await Post.findById(id);
  } catch (err) {
    console.log('findById failed');
    return res.status(500).json({ message: "Something went wrong, please try again later" });
  }
  if (!post) {
    console.log('findById found no post');
    return res.status(404).json({ message: "No post found" });
  }

  // Dacă imaginea postării se schimbă, șterge imaginea veche de pe Cloudinary
  if (post.image != image) {
    try {
      console.log('cloudinary destroy called');
      // Șterge imaginea veche de pe Cloudinary
      await cloudinary.uploader.destroy(post.image);

      // Încarcă noua imagine pe Cloudinary și obține link-ul
      console.log('cloudinary upload called');
      const result = await cloudinary.uploader.upload(image);
      post.image = result.secure_url;
    } catch (err) {
      console.error('A apărut o eroare în timpul încărcării imaginii:', err);
      return res.status(500).json({ message: "Failed to update image" });
    }
  }

  post.title = title;
  post.description = description;
  post.location = location;

  try {
    console.log('save called');
    await post.save();
  } catch (err) {
    console.log('save failed');
    return res.status(500).json({ message: "Something went wrong, please try again later" });
  }

  return res.status(200).json({ post });
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
    await Promise.all(post.images.map(async (image) => {
      await cloudinary.uploader.destroy(image.public_id);
    }));
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