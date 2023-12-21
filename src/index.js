import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./Redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Message from "./pages/Message/MessagePage";
import Authentication from "./pages/Authentication/Authentication";
import HomePage from "./pages/Home/HomePage";
import { getProfileAction } from "./Redux/Auth/auth.action";

// function AppRouter() {
//   const dispatch = useDispatch();
//   const auth = useSelector((store) => store.auth);

//   const jwtToken = localStorage.getItem("token");

//   useEffect(() => {
//     dispatch(getProfileAction(jwtToken));
//   }, [dispatch, jwtToken, auth.user]);

//   return (
//     <RouterProvider
//       router={createBrowserRouter([
//         {
//           path: "/",
//           element: auth.user ? <HomePage /> : <Authentication />,
//         },
//         {
//           path: "/authentication",
//           element: <Authentication />,
//         },
//         {
//           path: "/message",
//           element: <Message />,
//         },
//       ])}
//     />
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* <AppRouter /> */}
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
