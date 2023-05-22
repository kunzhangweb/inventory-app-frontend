import React from "react";
import Grid from "@mui/material/Grid";

import Login from "./auth/Login";

const HomePage = () => {
  return (
    <>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
        }}
      >
        {/* background picture */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundImage: "url(/BackgroundPic.jpeg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* login form */}
        <Login />
        {/* end right section */}
      </Grid>
    </>
  );
};

export default HomePage;
