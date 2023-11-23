import { Box, CircularProgress, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllPosts } from "../api-helpers/helpers";
import DiaryItem from "./DiaryItem";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


const Diaries = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const postsPerPage = isSmallScreen ? 1 : 6;

  useEffect(() => {
    getAllPosts()
      .then((data) => {
        setPosts(data?.posts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
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
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {posts
            .slice((page - 1) * postsPerPage, page * postsPerPage)
            .map((item, index) => (
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
        </>
      )}

      {!isLoading && (
        <Box display="flex" justifyContent="center" width="100%" mt={4} mb={2}>
          <Pagination
            count={Math.ceil(posts.length / postsPerPage)}
            page={page}
            onChange={(event, value) => setPage(value)}
            sx={{ backgroundColor: 'white' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Diaries;
