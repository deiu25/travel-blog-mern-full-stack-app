import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAllPost } from "../api-helpers/helpers";
import DiaryItem from "./DiaryItem";

const Diaries = () => {
  const [posts, setPosts] = useState();
  useEffect(() => {
    getAllPost()
      .then((data) => setPosts(data?.posts))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      padding={3}
      justifyContent="center"
      alignItems={"center"}
    >
      {" "}
      {posts &&
        posts.map((item, index) => (
          <DiaryItem
            date={new Date(`${item.date}`).toLocaleDateString()}
            description={item.description}
            image={item.image}
            id={item._id}
            location={item.location}
            title={item.title}
            key={index}
          />
        ))}
    </Box>
  );
};

export default Diaries;
