import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "./Redux/Auth/auth.action";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Message from "./pages/Message/MessagePage";
import Authentication from "./pages/Authentication/Authentication";
import HomePage from "./pages/Home/HomePage";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "./Theme/DarkTheme";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const jwtToken = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getProfileAction(jwtToken));
  }, [jwtToken]);

  return (
    <ThemeProvider theme={darkTheme} className="App">
      <Router>
        <Routes>
          <Route
            path="/*"
            element={auth.user ? <HomePage /> : <Authentication />}
          />
          <Route path="/message" element={<Message />} />
          <Route path="/*" element={<Authentication />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
