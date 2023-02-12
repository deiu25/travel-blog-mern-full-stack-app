import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import React from "react";
import AddRoadIcon from "@mui/icons-material/AddRoad";

const Add = () => {
  return (
    <Box display="flex" flexDirection={"column"} width="100%" height="100%">
      <Box display="flex" margin="auto" padding={2}>
        <Typography
          variant="h4"
          fontFamily={"dancing script"}
          fontWeight={"bold"}
        >
          Add Your Travel Diary
        </Typography>
        <AddRoadIcon
          sx={{ fontSize: "40px", paddingLeft: 1, color: "lightcoral" }}
        />
      </Box>
      <form>
        <Box
          padding={3}
          display="flex"
          flexDirection={"column"}
          margin={"auto"}
          width="50%"
        >
          <FormLabel sx={{ fontFamily: "quicksand" }}>Title</FormLabel>
          <TextField variant="standard" margin="normal" />
          <FormLabel sx={{ fontFamily: "quicksand" }}>Location</FormLabel>
          <TextField variant="standard" margin="normal" />
          <FormLabel sx={{ fontFamily: "quicksand" }}>Image URL</FormLabel>
          <TextField variant="standard" margin="normal" />
          <FormLabel sx={{ fontFamily: "quicksand" }}>Date</FormLabel>
          <TextField variant="standard" margin="normal" />
          <FormLabel sx={{ fontFamily: "quicksand" }}>Description</FormLabel>
          <TextField variant="standard" margin="normal" />
          <Button
            variant="contained"
            color="warning"
            sx={{ width: "40%", margin: "auto", mt: 2, borderRadius: 7 }}
          >
            Post
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Add;
