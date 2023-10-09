import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import postRouter from "./routing/post-routes.js";
import userRoute from "./routing/user-routes.js";
import errorHandler from "./middleware/errorMiddleware.js";


const app = express();
dotenv.config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["https://travel-blog-app-frontend.vercel.app", "http://localhost:3000"], 
    credentials: true,
  })
);
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});
app.use("/api/users", userRoute);
app.use("/posts", postRouter);

// connections
mongoose
  .connect(
    `mongodb+srv://syntaxseekers:${process.env.MONGODB_PASSWORD}@travel.sgp0uix.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(5000, () =>
      console.log("Connection Succesfull  & Listening to localhost Port 5000")
    )
  )
  .catch((err) => console.log(err));

app.use(errorHandler);