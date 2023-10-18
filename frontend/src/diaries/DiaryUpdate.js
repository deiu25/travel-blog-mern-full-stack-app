import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostDetails, postUpdate } from "../api-helpers/helpers";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { toast } from 'react-toastify';


const DiaryUpdate = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    location: "",
  });
  const [file, setFile] = useState(null);
  const id = useParams().id;

  useEffect(() => {
    getPostDetails(id)
      .then((data) => {
        console.log("Post data: ", data);
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
  if (e.target.name === "image") {
    setFile(e.target.files[0]);
  } else {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  postUpdate(inputs, id, file)
    .then((data) => {
      console.log("Post updated successfully: ", data);
      toast.success("Post updated successfully");
      navigate("/diaries");
    })
    .catch((err) => {
      console.log(err);
      toast.error("Failed to update post");
    });
};

  return (
    <Box display="flex" flexDirection={"column"} width="100%" height="100vh" sx={{ backgroundColor: "white" }}>
      <Box display="flex" margin="auto" paddingTop={10}>
        <Typography
          fontWeight={"bold"}
          variant="h4"
          fontFamily={"dancing script"}
          sx={{
            color: "#333"}}
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
             <input type="file" name="image" onChange={handleChange} multiple />

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
