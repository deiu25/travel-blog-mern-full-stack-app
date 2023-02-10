import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const DiaryItem = () => {
  return (
    <Card
      sx={{
        width: "50%",
        height: "50vh",
        margin: 1,
        padding: 1,
        display: "flex",
        flexDirection: "column",
        boxShadow: "5px 5px 10px #ccc",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {<EditLocationAltIcon />}
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <img height="194" src="/sea.jpg" alt="sea" />
      <CardContent>
        <Typography paddingBottom={1} variant="h6" color="text.secondary">
          This impressive paella
        </Typography>
        <hr />
        <Box paddingTop={1} display="flex">
          <Typography width="170px" fontWeight={"bold"} variant="div">
            Deiu Andrei:
          </Typography>

          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ marginLeft: "auto" }}>
        <IconButton color="warning">
          <EditIcon />
        </IconButton>
        <IconButton color="error">
          <DeleteForeverIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default DiaryItem;
