import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getPostDetails } from "../../api-helpers/helpers";
import "./DiaryDetail.css";
import img1 from "./imgs/img1.jpg";
import img2 from "./imgs/img2.jpg";
import img3 from "./imgs/img3.jpg";
import img4 from "./imgs/img4.jpg";

const images = [img1, img2, img3, img4];

const DiaryDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    getPostDetails(id)
      .then((data) => setPost(data.post))
      .catch((err) => console.log(err));
  }, [id]);

  const handleNext = () => {
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="slider">
      <div className="wrapper">
        <div className="left">
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
        <div className="controls">
          <div className="up" onClick={handlePrev}>
            <i className="fa fa-chevron-up"></i>
          </div>
          <div className="down" onClick={handleNext}>
            <i className="fa fa-chevron-down"></i>
          </div>
        </div>
        <div className="right">
          <img src={images[imageIndex]} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default DiaryDetail;
