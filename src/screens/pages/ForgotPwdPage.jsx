import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { toast } from "react-toastify";
import { validateEmail } from "../../utils/EmailValidation";
import { forgotPassword } from "../../services/AuthService";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    const emailAdress = event.target.value;
    setEmail(emailAdress);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    /** email validation */
    if (!email) {
      return toast.error("Please enter some data.");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email address.");
    }

    // sent the email
    const userData = {
      email,
    };

    await forgotPassword(userData);
    setEmail("");
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AttachEmailIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Forgot Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={handleEmailChange}
              autoComplete="email"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Get Reset Email
            </Button>
            {/* return back to home page */}
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  Home
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  Login
                </Link>
              </Grid>
            </Grid>
            {/* or login again */}
          </Box>
        </Box>
        {/* end form */}
      </Container>
    </>
  );
};

export default Forgot;
