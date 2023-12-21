import { Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { loginUserAction } from "../../Redux/Auth/auth.action";
import { useNavigate } from "react-router-dom";

const initialValues = { email: "", password: "" };
const validationScheme = {
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
};
const Login = () => {
  const [formValue, setFormValue] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = (values) => {
    console.log("handle submit", values);
    dispatch(loginUserAction({ data: values }));
    navigate("/")
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        // validationSchema={validationScheme}
        initialValues={initialValues}
      >
        <Form className="space-y-5">
          <div className="space-y-5">
            <div className="">
              <Field
                name="email"
                placeholder="Email"
                as={TextField}
                type="email"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="email"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div className="">
              <Field
                name="password"
                placeholder="Password"
                as={TextField}
                type="password"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="password"
                component={"div"}
                className="text-red-500"
              />
            </div>
          </div>
          <Button
            sx={{ padding: ".8rem 0rem" }}
            fullWidth
            type="submit"
            variant="contained"
            color="success"
          >
            Login
          </Button>
        </Form>
      </Formik>
      <div className="flex items-center gap-2 justify-center pt-5">
        <p>you don't have account ? </p>
        <Button onClick={() => navigate('/register')}>Register</Button>
      </div>
    </>
  );
};

export default Login;
