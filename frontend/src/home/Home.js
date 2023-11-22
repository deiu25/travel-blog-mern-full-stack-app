import { Button, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { keyframes } from "@mui/system";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../auth/redux/features/auth/authSlice";

const Home = () => {
  const zoomAnimation = keyframes`
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  `;

  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleShareStoryClick = () => {
    if (isLoggedIn) {
      navigate("/add");
    } else {
      navigate("/auth");
    }
  };

  return (
    <Box width="100%" height="100vh" position="relative">
      <Box
        component="img"
        src="/road.webp"
        alt="Road"
        sx={{
          objectFit: "cover",
          position: "absolute",
          zIndex: 1,
          filter: "brightness(0.7)",
          animation: `${zoomAnimation} 30s ease-in-out infinite`,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
      <Box position="absolute" left={0} width="100%" height="100%" zIndex={2}>
        <Container maxWidth="sm" sx={{ position: "relative", mt: 15 }}>
          <Box textAlign="center" sx={{ mt: 5 }}>
            <Typography
              fontFamily={"Dancing Script,cursive"}
              variant="h3"
              fontWeight="bold"
              textAlign={"center"}
              sx={{
                color: "#fff",
                background: "transparent",
                p: 2,
                mb: 2,
              }}
            >
              Dare to live the life you've always desired
            </Typography>
            <Typography variant="h5" fontFamily="quicksand" color="#fff">
              SHARE YOUR TRAVEL DIARIES WITH US
            </Typography>
            <Box margin="auto" mt={3} display="flex" justifyContent="center">
              <Button
                onClick={handleShareStoryClick}
                variant="outlined"
                sx={{
                  mr: 2,
                  color: "white",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                Share Your Story
              </Button>
              <Button
                LinkComponent={Link}
                to="/diaries"
                variant="outlined"
                sx={{
                  ml: 2,
                  color: "white",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                View Diaries
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
