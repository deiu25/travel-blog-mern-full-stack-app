import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUserDetails } from "../api-helpers/helpers";
import DiaryItem from "../diaries/DiaryItem";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  useEffect(() => {
    getUserDetails()
      .then((data) => setUser(data.user))
      .catch((err) => console.log(err));
  }, []);

  const handleClick = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("userId");
    navigate("/");
  };
  return (
    <Box display="flex" flexDirection={"column"}>
      ;
      {user && (
        <>
          <Typography
            textAlign={"center"}
            variant="h3"
            fontFamily={"quicksand"}
            padding={2}
          >
            {user.name} Profile
          </Typography>
          <Typography fontFamily={"quicksand"} padding={1} textAlign="left">
            Name: {user.name}
          </Typography>
          <Typography fontFamily={"quicksand"} padding={1} textAlign="left">
            Email: {user.email}
          </Typography>
          <Button
            onClick={handleClick}
            sx={{ mr: "auto", width: "15%" }}
            color="warning"
            variant="contained"
          >
            Logout
          </Button>
          <Box
            display="flex"
            flexDirection={"row"}
            flexWrap={"wrap"}
            justifyContent="center"
            alignItems={"stretch"}
            alignContent="center"
            padding={3}
          >
            {user.posts.map((post, index) => (
              <DiaryItem
                key={index}
                title={post.title}
                date={post.date}
                description={post.description}
                id={post.id}
                image={post.image}
                location={post.location}
                user={user._id}
              />
            ))}
          </Box>{" "}
        </>
      )}
    </Box>
  );
};

export default Profile;
