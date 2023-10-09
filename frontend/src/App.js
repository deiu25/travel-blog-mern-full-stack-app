import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Leyout } from "./auth/components/layout/Leyaout";

import { Auth } from "./auth/pages/auth/Auth";
import { Forgot } from './auth/pages/auth/Forgot';
import { Reset } from './auth/pages/auth/Reset';
import { LoginWithCode } from './auth/pages/auth/LoginWithCode';
import { Verify } from './auth/pages/auth/Verify';
import { Profile } from './auth/pages/profile/Profile';
import { ChangePassword } from './auth/pages/changePassword/ChangePassword';
import { UserList } from './auth/pages/userList/UserList';

import Add from "./diaries/Add";
import Diaries from "./diaries/Diaries";
import DiaryUpdate from "./diaries/DiaryUpdate";
import Header from "./header/Header";
import Home from "./home/Home";

import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import { getLoginStatus, getUser, selectIsLoggedIn, selectUser } from './auth/redux/features/auth/authSlice';

import { GoogleOAuthProvider } from "@react-oauth/google";

axios.defaults.withCredentials = true;


function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const location = useLocation();

  useEffect(() => {
    dispatch(getLoginStatus());
    if(isLoggedIn && user === null){
      dispatch(getUser());
    }
    }, [dispatch, isLoggedIn, user]);

    const basePath = location.pathname.split('/')[1];
    const authPaths = ["auth", "forgot", "resetPassword", "loginWithCode", "verify", "profile", "changePassword", "users"];

  return (
    <div>
      {!authPaths.includes(basePath) && (
      <Header /> )}
      <section>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diaries" element={<Diaries />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/forgot" element={<Forgot />} />
            <Route path="/resetPassword/:resetToken" element={<Reset />} />
            <Route path="/loginWithCode/:email" element={<LoginWithCode />} />
          
            <Route path="/verify/:verificationToken" element={<Verify />} />

            <Route path="/profile" element={<Leyout>
              <Profile />
            </Leyout>} />
            <Route path="/changePassword" element={<Leyout>
              <ChangePassword />
            </Leyout>} />
            <Route path="/users" element={<Leyout>
              <UserList />
              </Leyout>} />
          {isLoggedIn && (
            <>
              <Route path="/add" element={<Add />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/post/:id" element={<DiaryUpdate />} />{" "}
            </>
          )}
        </Routes>
        </GoogleOAuthProvider>
      </section>
    </div>
  );
}

export default App;