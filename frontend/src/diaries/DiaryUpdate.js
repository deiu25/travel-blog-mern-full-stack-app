import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteImage,
  getPostDetails,
  updatePost,
} from "../api-helpers/helpers";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { toast } from "react-toastify";

const DiaryUpdate = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    location: "",
  });
  const [file, setFile] = useState(null);
  const [previewSource, setPreviewSource] = useState([]);
  const id = useParams().id;

  useEffect(() => {
    getPostDetails(id)
      .then((data) => {
        setPost(data.post);

        setInputs({
          title: data.post.title,
          description: data.post.description,
          location: data.post.location,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "images") {
      setFile(Array.from(e.target.files));
      setPreviewSource(
        e.target.files.length > 0
          ? Array.from(e.target.files).map((file) => URL.createObjectURL(file))
          : []
      );
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleDeletePreview = (index) => {
    setPreviewSource((prev) => prev.filter((src, i) => i !== index));
    setFile((prev) => prev.filter((file, i) => i !== index));
  };

  const handleDeleteImage = (public_id) => {
    // Delete the image from the post state
    setPost((prevPost) => {
      return {
        ...prevPost,
        images: prevPost.images.filter(
          (image) => image.public_id !== public_id
        ),
      };
    });

    // Send a request to the backend to delete the image from Cloudinary
    deleteImage(public_id)
      .then((data) => {
        if (data) {
          console.log("Image deleted successfully: ", data);
          toast.success("Image deleted successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to delete image");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("description", inputs.description);
    formData.append("location", inputs.location);
    if (file) {
      file.forEach((f, index) => {
        formData.append("images", f);
      });
    }

    updatePost(id, formData)
      .then((data) => {
        toast.success("Post updated successfully");
        navigate("/diaries");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update post");
      });
  };

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      width="100%"
      height="auto"
      sx={{ backgroundColor: "white" }}
    >
      <Box display="flex" margin="auto" paddingTop={10}>
        <Typography
          fontWeight={"bold"}
          variant="h4"
          fontFamily={"dancing script"}
          sx={{
            color: "#333",
          }}
        >
          Add Your Travel Diary
        </Typography>
        <TravelExploreIcon
          sx={{ fontSize: "40px", paddingLeft: 1, color: "lightcoral  " }}
        />
      </Box>
      {post && (
        <form onSubmit={handleSubmit}>
          <Box
            padding={3}
            display="flex"
            width="60%"
            margin="auto"
            flexDirection={"column"}
          >
            <FormLabel sx={{ fontFamily: "quicksand" }}>Title</FormLabel>
            <TextField
              onChange={handleChange}
              name="title"
              value={inputs.title}
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={{ fontFamily: "quicksand" }}>Description</FormLabel>
            <TextField
              onChange={handleChange}
              name="description"
              value={inputs.description}
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={{ fontFamily: "quicksand" }}>Image</FormLabel>
            <input type="file" name="images" onChange={handleChange} multiple />
            <Box className="imgPrevUpdate">
              {previewSource.map((src, index) => (
                <div key={index}>
                  <img src={src} alt="" className="imgPrev" />
                  <button
                    onClick={() => handleDeletePreview(index)}
                    className="deleteImgPrev"
                  >
                    X
                  </button>
                </div>
              ))}
            </Box>
            <FormLabel sx={{ fontFamily: "quicksand" }}>Old Images</FormLabel>
            <Box className="imgPrevUpdate">
              {post.images.map((image, index) => (
                <div key={index}>
                  <img src={image.url} alt="" className="imgPrev" />
                  <button
                    className="deleteImgPrev"
                    onClick={() => handleDeleteImage(image.public_id)}
                  >
                    X
                  </button>
                </div>
              ))}
            </Box>
            <FormLabel sx={{ fontFamily: "quicksand" }}>Location</FormLabel>
            <TextField
              onChange={handleChange}
              name="location"
              value={inputs.location}
              variant="standard"
              margin="normal"
            />

            <Button
              type="submit"
              color="warning"
              sx={{ width: "50%", margin: "auto", mt: 2, borderRadius: 7 }}
              variant="contained"
            >
              Post
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default DiaryUpdate;
