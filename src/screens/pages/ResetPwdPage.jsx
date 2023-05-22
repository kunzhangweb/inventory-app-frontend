import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockResetIcon from "@mui/icons-material/LockReset";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/AuthService";

const initialState = {
  password: "",
  confirmPassword: "",
};

const Reset = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, confirmPassword } = formData;
  const { resetToken } = useParams();

  const handlePwdChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    /** data validation */
    if (password.length < 6) {
      return toast.error("The password must be 6 characters up.");
    }
    if (password !== confirmPassword) {
      return toast.error("Two passwords do not match.");
    }

    // process the reset
    const userData = {
      password,
      confirmPassword,
    };

    try {
      console.log(userData);
      const data = await resetPassword(userData, resetToken);
      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
    }
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
            <LockResetIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: 500 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              value={password}
              onChange={handlePwdChange}
              autoComplete="new-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handlePwdChange}
              autoComplete="confirm-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
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

export default Reset;
