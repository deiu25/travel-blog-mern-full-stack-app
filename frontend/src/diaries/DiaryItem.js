import React, { useState } from "react";
import { deletePost } from "../api-helpers/helpers";
import {
  Alert,
  CardActions,
  IconButton,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TitleIcon from "@mui/icons-material/Title"; 
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./DiaryCard.css";
import { Link } from "react-router-dom";

const DiaryItem = ({ title, images, location, id, user, onPostDelete }) => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const isLoogedInUser = () => {
    const userIdFromStorage = localStorage.getItem("userId");

    if (userIdFromStorage === user._id) {
      return true;
    }
    return false;
  };

  const handleOpenConfirm = () => {
    setConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    setConfirmOpen(false);
  };

  const handleDelete = () => {
    deletePost(id)
      .then((data) => {
        console.log(data);
        onPostDelete(id);
      })
      .catch((err) => console.log(err));
    setOpen(true);
    setConfirmOpen(false);
  };

  return (
<div className="card">
      <div className="imgBx">
        <Carousel showIndicators={false} showThumbs={false} infiniteLoop={true}>
          {images.map((img, index) => (
            <div key={index}>
              <img src={img.url} alt="images" />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="content">
        <span className="price">
          <Link to={`/post/${id}`}><TravelExploreIcon fontSize="medium" /></Link>
        </span>
        <ul className="text diary-card-ul">
        <li>
            <TitleIcon /> <b>{title}</b>  
          </li>
          <li>
            <LocationOnIcon /> {location}  
          </li>
          <li>
            <CardActions>
              {isLoogedInUser() && (
                <>
                  <IconButton
                    component={Link}
                    to={`/edit/${id}`}
                    color="warning"
                  >
                    <ModeEditOutlineIcon />
                  </IconButton>
                  <IconButton onClick={handleOpenConfirm} color="error">
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

          <Dialog open={confirmOpen} onClose={handleCloseConfirm}>
            <DialogTitle>{"Confirm Delete"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this post?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirm}>Cancel</Button>
              <Button onClick={handleDelete} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </ul>
      </div>
    </div>
  );
};

export default DiaryItem;
