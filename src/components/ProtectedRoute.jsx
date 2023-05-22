import React from "react";
import { useSelector } from "react-redux";

import { Redirect, Route } from "react-router-dom";
import { selectedIsLoggedIn } from "../redux/features/auth/AuthSlice";

const ProtectedRoute = (props) => {
  // const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isLoggedIn = useSelector(selectedIsLoggedIn);

  if (!isLoggedIn) {
    localStorage.clear();
    return <Redirect to={{ pathname: "/login" }} />;
  }

  return isLoggedIn ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
};

export default ProtectedRoute;
