import React from "react";
import { BrowserRouter } from "react-router-dom";
import Axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline } from "@mui/material";

import MainLayout from "./layouts/main-layout";
import Routes from "./Routes";

// being able to save credentials
// throught the whole app
Axios.defaults.withCredentials = true;

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <CssBaseline />
      <MainLayout>
        <Routes />
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
