import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getPostDetails } from "../../api-helpers/helpers";

const Slider = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 1; // Presupunem că avem un singur slide

  useEffect(() => {
    getPostDetails(postId)
      .then((data) => setPost(data?.post))
      .catch((err) => console.log(err));
  }, [postId]);

  const handleUpClick = () => {
    if (currentSlide === 0) {
      return;
    }
    setCurrentSlide(currentSlide - 1);
  };

  const handleDownClick = () => {
    if (currentSlide === totalSlides) {
      return;
    }
    setCurrentSlide(currentSlide + 1);
  };

  if (!post) return <p>Loading...</p>;

  const marginTopLeft = `${currentSlide * -100}vh`;
  const marginTopRight = `${(totalSlides - currentSlide) * -100}vh`;

  return (
    <div className="slider">
      <div className="controls">
        <button className="up" onClick={handleUpClick}>Up</button>
        <button className="down" onClick={handleDownClick}>Down</button>
      </div>
      <div className="wrapper">
        <div className="left" style={{marginTop: marginTopLeft}}>
          <h1>{post.title}</h1>
          <p>{post.location}</p>
          <p>{post.date}</p>
          <p>{post.description}</p>
        </div>
        <div className="right" style={{marginTop: marginTopRight}}>
          <img src={post.image} alt="Post" />
        </div>
      </div>
    </div>
  );
};

export default Slider;