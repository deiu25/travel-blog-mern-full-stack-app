import React from "react";
import { useDispatch } from "react-redux";
import { RESET, verifyUser } from "../../redux/features/auth/authSlice";
import { useParams } from "react-router-dom";
import './AuthStyle.css'

export const Verify = () => {

  const dispatch = useDispatch();
  const { verificationToken } = useParams();

  const verifyAccount = async () => {
    await dispatch(verifyUser(verificationToken));
    await dispatch(RESET());
  };

  return (
    <section className="custom-section margin-top-3rem">
      <div className="hero-text">
        <h2>Account Verification</h2>
        <p>To verify your account, click the button below...</p>
        <button className="btn margin-top-3rem" onClick={verifyAccount}>Verify Account</button>
      </div>
    </section>
  );
};
