import React, { useEffect } from "react";
import { getUserDetails } from "../api-helpers/helpers";

const Profile = () => {
  useEffect(() => {
    getUserDetails()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return <div>Profile</div>;
};

export default Profile;
