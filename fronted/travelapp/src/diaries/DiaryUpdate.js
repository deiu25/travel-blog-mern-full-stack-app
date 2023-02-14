import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostDetails } from "../api-helpers/helpers";

const DiaryUpdate = () => {
  const id = useParams().id;
  console.log(id);
  useEffect(() => {
    getPostDetails(id)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return <div>DiaryUpdate</div>;
};

export default DiaryUpdate;
