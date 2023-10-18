import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostDetails } from "../../api-helpers/helpers";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const DiaryDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPostDetails(id)
      .then((data) => {
        setPost(data.post);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(
          "There was an error loading the post. Please try again later."
        );
        setIsLoading(false);
      });
  }, [id]);

  const images = post?.images || [];

  const handleNext = () => {
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: "aliceblue" }}
    >
      <Box display="flex" justifyContent="space-between" width="50%" pl={2}>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography
            fontWeight={"bold"}
            variant="h4"
            fontFamily={"dancing script"}
            color="text.primary"
            mb={2}
          >
            {post.title}
          </Typography>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 300,
              letterSpacing: "0.025em",
              lineHeight: 1.5,
              color: "#333",
              textTransform: "none",
              whiteSpace: "pre-line",
              marginBottom: "1em",
            }}
          >
            {post.description}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton
            onClick={handlePrev}
            color="primary"
            sx={{
              backgroundColor: "#f5f5f5",
              boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#1976d2",
                boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
                color: "white",
              },
            }}
          >
            <ArrowUpwardIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={handleNext}
            color="primary"
            sx={{
              backgroundColor: "#f5f5f5",
              boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#1976d2",
                boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
                color: "white",
              },
            }}
          >
            <ArrowDownwardIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="50%"
      >
        {images.length > 0 ? (
          <img
            src={images[imageIndex]?.url}
            alt={`Slide ${imageIndex}`}
            style={{
              maxHeight: "100vh",
              maxWidth: "auto",
              borderRadius: "1em",
              boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
            }}
          />
        ) : (
          <Typography variant="body1">
            No images available for this post.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default DiaryDetail;