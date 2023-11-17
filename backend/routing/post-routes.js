import express from "express";
import { addPost, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/post-controller.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from 'multer';

const upload = multer();

const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPostById);

postRouter.post("/", upload.array('images'), protect, addPost);
postRouter.put("/:id", upload.array('images'), protect, updatePost);
postRouter.delete("/:id", protect, deletePost);

export default postRouter;