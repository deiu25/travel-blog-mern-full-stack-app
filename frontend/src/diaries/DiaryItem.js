import { Alert, CardActions, IconButton, Snackbar } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import "./DiaryCard.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { postDelete } from "../api-helpers/helpers";

const DiaryItem = ({
  title,
  description,
  image,
  location,
  date,
  id,
  user,
  onPostDelete,
}) => {
  const [open, setOpen] = useState(false);

  const isLoogedInUser = () => {
    const userIdFromStorage = localStorage.getItem("userId");

    if (userIdFromStorage === user._id) {
      return true;
    }
    return false;
  };

  const handleDelete = () => {
    postDelete(id)
      .then((data) => {
        console.log(data);
        onPostDelete(id);
      })
      .catch((err) => console.log(err));
    setOpen(true);
  };

  return (
    <div className="card">
      <div className="imgBx">
        <img src={image} alt="images" />
      </div>

      <div className="content">
        <span className="price">
          <a href="">Show</a>
        </span>

        <ul>
          <li>
            <b>{title}</b>
          </li>
          <li>{location}</li>
          <li>
            <CardActions>
              {isLoogedInUser() && (
                <>
                  <IconButton component={Link} to={`/post/${id}`} color="warning">
                    <ModeEditOutlineIcon />
                  </IconButton>
                  <IconButton onClick={handleDelete} color="error">
                    <DeleteForeverIcon />
                  </IconButton>
                </>
              )}
            </CardActions>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={() => setOpen(false)}
            >
              <Alert
                onClose={() => setOpen(false)}
                severity="success"
                sx={{ width: "100%" }}
              >
                Post was successfully deleted!
              </Alert>
            </Snackbar>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DiaryItem;
