import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAllPosts } from "../api-helpers/helpers";
import DiaryItem from "./DiaryItem";

const Diaries = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    getAllPosts()
      .then((data) => setPosts(data?.posts))
      .catch((err) => console.log(err));
  }, []);

  const handlePostDelete = (deletedPostId) => {
    setPosts(posts.filter((post) => post._id !== deletedPostId));
  };

  return (
    <Box
      display="flex"
      flexDirection={"row"}
      flexWrap={"wrap"}
      justifyContent="center"
      alignContent={"space-around"}
      paddingTop={10}
      paddingBottom={10}
      sx={{ backgroundColor: "white" }}
    >
      {posts &&
        posts.map((item, index) => (
          <DiaryItem
            date={new Date(`${item.date}`).toLocaleDateString()}
            description={item.description}
            images={item.images}
            id={item._id}
            location={item.location}
            title={item.title}
            key={index}
            user={item.user}
            onPostDelete={handlePostDelete}
          />
        ))}
    </Box>
  );
};

export default Diaries;
