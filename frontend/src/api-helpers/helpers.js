import api from "./api";

export const addPost = async (formData) => {
  console.log('formData:', formData); 
  try {
    const res = await api.post("/posts/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log('Răspuns de la server:', res);

    if (res.status !== 201) {
      console.error("A apărut o eroare: starea răspunsului nu este 201");
      return null;
    }

    return res.data.post;
  } catch (err) {
    console.error("A apărut o eroare în timpul adăugării postării:", err);
    return null;
  }
};

export const getAllPosts = async () => {
  const res = await api.get("/posts");
  if (res.status !== 200) {
    return console.log("Some Error Occurred");
  }

  const data = res.data;
  return data;
};

export const getPostDetails = async (id) => {
  const res = await api.get(`/posts/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unable to fetch diary");
  }

  const resData = await res.data;
  return resData;
};

export const postUpdate = async (data, id) => {
  const res = await api
    .put(`/posts/${id}`, {
      title: data.title,
      description: data.description,
      location: data.location,
      image: data.imageUrl,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unable to udpate");
  }

  const resData = await res.data;
  return resData;
};

export const postDelete = async (id) => {
  const res = await api
    .delete(`/posts/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unable to delete");
  }

  const resData = await res.data;
  return resData;
};