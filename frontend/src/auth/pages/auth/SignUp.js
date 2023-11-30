import React, { useEffect, useState } from "react";
import { PasswordInput } from "../../components/passwordInput/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/features/auth/authService";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  RESET,
  sendVerificationEmail,
} from "../../redux/features/auth/authSlice";
import { Loader } from "../../components/loader/Loader";
import './AuthStyle.css'

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUp = () => {
  const [formData, setFormData] = useState(initialState);
  const { firstname, lastname, email, password, confirmPassword } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      return toast.error("Please fill in all fields");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (!validateEmail(email)) {
      return toast.error("Invalid email");
    }

    const userData = {
      firstname,
      lastname,
      email,
      password,
    };

    await dispatch(register(userData));
    await dispatch(sendVerificationEmail());
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }
    dispatch(RESET());
  }, [isSuccess, isLoggedIn, navigate, dispatch]);

  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const timesIcon = <i className="uil uil-times"></i>;
  const checkIcon = <i className="uil uil-check"></i>;

  const switchIcon = (condition) => {
    return condition ? checkIcon : timesIcon;
  };

  useEffect(() => {
    if (password.length > 5) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }

    if (password.match(/[A-Z]/)) {
      setUCase(true);
    } else {
      setUCase(false);
    }

    if (password.match(/[0-7]/)) {
      setNum(true);
    } else {
      setNum(false);
    }

    if (password.match(/[!@#$%^&*]/)) {
      setSChar(true);
    } else {
      setSChar(false);
    }
  }, [password]);

  return (
    <div className="card-back">
      <div className="center-wrap">
        {isLoading && <Loader />}
        <div className="section centered-text">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            width="50"
            height="50"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            ></path>
          </svg>
          <h4 className="singUp">Sign Up</h4>
          <form className="form-group" onSubmit={registerUser}>
            <div className="name-group form-group-flex">
              <div className="form-group">
                <input
                  type="text"
                  name="firstname"
                  value={firstname}
                  onChange={handleInputChange}
                  className="form-style"
                  placeholder="First Name"
                  id="firstname"
                  autoComplete="off"
                />
                <i className="input-icon uil uil-user"></i>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={handleInputChange}
                  className="form-style"
                  placeholder="Last Name"
                  id="lastname"
                  autoComplete="off"
                />
                <i className="input-icon uil uil-user"></i>
              </div>
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className="form-style margin-top"
                placeholder="Email"
                id="logemail"
                autoComplete="off"
              />
              <i className="input-icon uil uil-at"></i>
            </div>
            <div className="form-group">
            <PasswordInput
              className="form-style margin-top"
              id="registerPassword"
              autoComplete="off"
              placeholder="Password"
              name="password"
              required
              value={password}
              onChange={handleInputChange}
              OnPaste={(e) => {
                e.preventDefault();
                toast.error("You can't paste here");
                return false;
              }}
            />
            </div>
            <div className="form-group">
            <PasswordInput
              className="form-style margin-top"
              id="confirmPassword"
              autoComplete="off"
              placeholder="Repeat Password"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={handleInputChange}
              OnPaste={(e) => {
                e.preventDefault();
                toast.error("You can't paste here");
                return false;
              }}
            />
            </div>
            <div className="password-info">
              <div className="password-info-item">
                {switchIcon(passLength)}
                At least 6 characters
              </div>
              <div className="password-info-item">
                {switchIcon(uCase)}
                At least 1 uppercase letter
              </div>
              <div className="password-info-item">
                {switchIcon(num)}
                At least 1 number
              </div>
              <div className="password-info-item">
                {switchIcon(sChar)}
                At least 1 special character
              </div>
            </div>
            <button type="submit" className="btn mt-4">
              Submit
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
