import { Grid } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import HomeRight from "../../components/HomeRight/HomeRight";
import MiddlePart from "../../components/MiddlePart/MiddlePart";
import CreateReelsForm from "../../components/Reels/CreateReelsForm";
import Reels from "../../components/Reels/Reels";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProfilePage from "../Profile/ProfilePage";

const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const jwtToken = localStorage.getItem("token");
  const { auth } = useSelector((store) => store);

  console.log("auth --- ", auth);

  return (
    <div className="px-20">
      <Grid container spacing={0}>
        <Grid item xs={0} lg={3}>
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </Grid>

        <Grid
          item
          lg={location.pathname === "/" ? 6 : 9}
          xs={12}
          className="flex justify-center px-5"
        >
          <Routes>
            <Route path="/reels" element={<Reels />} />
            <Route path="/create-reels" element={<CreateReelsForm />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/" element={<MiddlePart />} />
          </Routes>
        </Grid>
        {location.pathname === "/" && (
          <Grid item lg={3} className="relative">
            <div className="sticky top-0 w-full">
              <HomeRight />
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default HomePage;
