import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getPostDetails } from "../../api-helpers/helpers";

const DiaryDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPostDetails(postId)
      .then((data) => setPost(data?.post))
      .catch((err) => console.log(err));
  }, [postId]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.location}</p>
        <p>{post.date}</p>
      <img src={post.image} alt="Post" />
      <p>{post.description}</p>
    </div>
  );
};

export default DiaryDetail;