import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { addPost } from "../api-helpers/helpers";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const Add = () => {
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess, isError } = useSelector(
    (state) => state.auth
  );
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    if (e.target.value) {
      setErrors((prevState) => ({
        ...prevState,
        [e.target.name]: null,
      }));
    }
  };

  const handleFileChange = (e) => {
    setFile(Array.from(e.target.files));
  };

  const onResReceived = (data) => {
    console.log(data);
    navigate("/diaries");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      setErrors({ form: "You must be logged in to post." });
      return;
    }

    if (!file) {
      setErrors({ form: "File is required." });
      return;
    }
  
    let formErrors = {};
  
    for (let key in inputs) {
      if (!inputs[key]) {
        formErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} field is required.`;
      }
    }
  
    if (!file) {
      formErrors.file = "File is required.";
    }

    if (!inputs.title || !inputs.description || !inputs.location || !inputs.date) {
      setErrors({ form: "Please fill in all required fields." });
      return;
    }

    console.log("Inputs:", inputs);
  
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
  
    const formData = new FormData();
    file.forEach((file, index) => {
      formData.append("images", file);
    });
    for (let key in inputs) {
      formData.append(key, inputs[key]);
    }
    
    try {
      console.log(file);
      const response = await addPost(formData);
      if (!response) {
        throw new Error("An error occurred while submitting the form.");
      }
      onResReceived(response);
    } catch (err) {
      console.log(err);
      setErrors({ form: err.message });
    }
  };

  return (
    <Box display="flex" flexDirection={"column"} width="100%" height="110vh" sx={{ backgroundColor: "white" }}>
      <Box display="flex" margin="auto" paddingTop={10}>
        <Typography
          fontWeight={"bold"}
          variant="h4"
          fontFamily={"dancing script"}
          sx={{color: "#333"}}
        >
          Add Your Travel Diary
        </Typography>
        <TravelExploreIcon
          sx={{ fontSize: "40px", paddingLeft: 1, color: "lightcoral" }}
        />
      </Box>
      <form onSubmit={handleSubmit}>
      {errors.form && <p>{errors.form}</p>}
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
             <input type="file" onChange={handleFileChange} multiple />
              {errors.file && <p>{errors.file}</p>}
            <FormLabel sx={{ fontFamily: "quicksand" }}>Location</FormLabel>
            <TextField
              onChange={handleChange}
              name="location"
              value={inputs.location}
              variant="standard"
              margin="normal"
            />

          <FormLabel sx={{ fontFamily: "quicksand" }}>Date</FormLabel>
          <TextField
            type="date"
            onChange={handleChange}
            name="date"
            value={inputs.date}
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
    </Box>
  );
};

export default Add;
