import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput } from "../../components/passwordInput/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/features/auth/authService";
import {
  login,
  loginWithGoogle,
  RESET,
  sendLoginCode,
} from "../../redux/features/auth/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import "./AuthStyle.css";

const initialState = {
  email: "",
  password: "",
};

export const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess, isError, twoFactor } = useSelector(
    (state) => state.auth
  );

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }
    if (!validateEmail(email)) {
      return toast.error("Invalid email");
    }

    const userData = {
      email,
      password,
    };

    const actionResult = await dispatch(login(userData));
    const isSignup = actionResult.payload.isSignup;
    const data = actionResult.payload.user;

    if (isSignup) {
      localStorage.setItem("userId", data._id);
    } else {
      localStorage.setItem("userId", data.id);
    }
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }

    if (isError && twoFactor) {
      dispatch(sendLoginCode(email));
      navigate(`/loginWithCode/${email}`);
    }

    dispatch(RESET());
  }, [isSuccess, isLoggedIn, isError, twoFactor, navigate, dispatch, email]);

  const googleLogin = async (credentialResponse) => {
    await dispatch(
      loginWithGoogle({ userToken: credentialResponse.credential })
    );
  };

  return (
    <div className="card-front">
      <div className="center-wrap">
        {isLoading && <Loader />}
        <div className="section centered-text">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 26"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            width="50"
            height="50"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            ></path>
          </svg>
          <h4 className="authTitle">Log In</h4>
          <form className="form-group" onSubmit={loginUser}>
            <div className="form-group google-button">
              <div className="flex-center">
                <GoogleLogin
                  onSuccess={googleLogin}
                  onError={() => {
                    toast.error("Login Failed");
                  }}
                  type={windowSize < 360 ? "icon" : "standard"}
                  shape={windowSize < 360 ? "circle" : "rect"}
                />
              </div>
              <br />
              <p className="or">or</p>
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={email}
                className="form-style"
                placeholder="Your Email"
                id="email"
                autoComplete="off"
                required
                onChange={handleInputChange}
              />
              <i className="input-icon uil uil-at"></i>
            </div>
            <div className="form-group">
              <PasswordInput
                className="form-style margin-top"
                id="loginPassword"
                autoComplete="off"
                placeholder="Your Password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn fullWidth margin-top-3rem">
              Login
            </button>
          </form>
          <p className="custom-paragraph">
            <Link to="/forgot">Forgot your password?</Link>
          </p>
          <p className="custom-paragraph">
            <Link to="/">Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
