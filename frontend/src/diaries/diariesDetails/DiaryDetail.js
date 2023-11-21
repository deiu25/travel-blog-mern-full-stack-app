import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostDetails } from "../../api-helpers/helpers";
import { Typography, CircularProgress } from "@mui/material";

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
    <div className="DD-slider">
      <div className="DD-controls">
        <div className="DD-up">
          <i onClick={handleNext} className="fa fa-chevron-up"></i>
        </div>
        <div className="DD-down">
          <i onClick={handlePrev} className="fa fa-chevron-down"></i>
        </div>
      </div>

      <div className="DD-wrapper">
        <div className="DD-left">
          <div>
            <Typography variant="h2">{post.title}</Typography>
            <Typography variant="body1">{post.description}</Typography>
          </div>
        </div>
        <div className="DD-right">
          <div>
            {images.length > 0 ? (
              <img src={images[imageIndex]?.url} alt={`Slide ${imageIndex}`} />
            ) : (
                <Typography variant="body1">
                  No images available for this post.
                </Typography>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryDetail;