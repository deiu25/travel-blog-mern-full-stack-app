import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAllPosts } from "../api-helpers/helpers";
import DiaryItem from "./DiaryItem";
import InfiniteScroll from 'react-infinite-scroll-component';

const Diaries = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadPosts = () => {
    getAllPosts(page)
      .then((data) => {
        if (data?.posts.length > 0) {
          setPosts((prevPosts) => [...prevPosts, ...data.posts]);
          setPage((prevPage) => prevPage + 1);
        } else {
          setHasMore(false);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    loadPosts();
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
      <InfiniteScroll
        dataLength={posts.length}
        next={loadPosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
       // endMessage={<p style={{ textAlign: 'center' }}>No more posts to show</p>}
        style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }} // Aici sunt aplicate stilurile
      >
        {posts.map((item, index) => (
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
      </InfiniteScroll>
    </Box>
  );
};

export default Diaries;