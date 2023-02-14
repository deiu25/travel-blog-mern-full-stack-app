import axios from "axios";

export const getAllPost = async () => {
  const res = await axios.get("/posts");
  if (res.status !== 200) {
    return console.log("Some error occured");
  }

  const data = res.data;
  return data;
};

export const sendAuthRequest = async (signup, data) => {
  const res = await axios
    .post(`/user/${signup ? "signup" : "login"}/`, {
      name: data.name ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200 && res.status !== 201) {
    return console.log("Unable to Login");
  }
  const resData = await res.data;
  return resData;
};

export const addPost = async (data) => {
  const res = await axios
    .post("/posts/", {
      title: data.title,
      description: data.description,
      location: data.location,
      image: data.imageUrl,
      date: data.date,
      user: localStorage.getItem("userId"),
    })
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const getPostDetails = async (id) => {
  const res = await axios.get(`/posts/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unable to fetch diary");
  }
  const resData = await res.data;
  return resData;
};
