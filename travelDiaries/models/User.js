import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLenght: 6,
  },
  posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
});

export default model("User", userSchema);
