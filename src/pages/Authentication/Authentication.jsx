/* eslint-disable jsx-a11y/img-redundant-alt */
import { Card, Grid } from "@mui/material";
import React from "react";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";

const Authentication = () => {
  return (
    <Grid container className="h-screen px-10">
      <Grid item xs={7}>
        <img
          src="social-media.png"
          className="w-full h-full"
          alt="background-image"
        />
      </Grid>
      <Grid item xs={5}>
        <div className="flex flex-col px-20 justify-center h-full">
          <Card className="card p-8">
            <div className="flex flex-col items-center mb-5 space-y-1">
              <h1 className="logo text-cente font-bold text-green-700">
                Aaw Social
              </h1>
              <p className="text-center text-sm w-[70&] font-semibold text-green-800">
                Connecting Lives, Sharing Stories : Your Social World, Your Way
              </p>
            </div>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
            </Routes>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
};

export default Authentication;
