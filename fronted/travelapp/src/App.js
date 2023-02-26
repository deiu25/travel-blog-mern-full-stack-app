import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Auth from "./auth/Auth";
import Add from "./diaries/Add";
import Diaries from "./diaries/Diaries";
import DiaryUpdate from "./diaries/DiaryUpdate";
import Header from "./header/Header";
import Home from "./home/Home";
import Profile from "./profile/Profile";
import { authActions } from "./store";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  const dispatch1 = useCallback(useDispatch(), []);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch1(authActions.login());
    }
  }, [dispatch1]);


  return (
    <div>
      <header>
        <Header />
      </header>

      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diaries" element={<Diaries />} />
          <Route path="/login" element={<Auth />} />
          {isLoggedIn && (
            <>
              {" "}
              <Route path="/add" element={<Add />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/post/:id" element={<DiaryUpdate />} />
            </>
          )}
        </Routes>
      </section>
    </div>
  );
}

export default App;
