import React, { useState } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { toast } from "react-toastify";
import { validateEmail } from "../../../utils/EmailValidation";
import { registerUser } from "../../../services/AuthService";

import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { SET_LOGIN } from "../../../redux/features/auth/AuthSlice";
import { SET_NAME } from "../../../redux/features/auth/AuthSlice";
import Loader from "../../../components/Loader";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [isloading, setIsloading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useHistory();
  const [formData, setFormData] = useState(initialState);
  const { username, email, password, confirmPassword } = formData;

  // when the values of text fields change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // submit the registration form
  const handleSubmit = async (event) => {
    event.preventDefault();

    /** data validation */
    if (!username || !email || !password) {
      return toast.error("Please enter some data in each field.");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email address.");
    }
    if (password.length < 6) {
      return toast.error("The password must be 6 characters up.");
    }
    if (password !== confirmPassword) {
      return toast.error("Two passwords do not match.");
    }

    // process the registration data
    const userData = {
      username,
      email,
      password,
    };
    setIsloading(true);
    try {
      const data = await registerUser(userData);
      // set login status
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.username));
      navigate.push("/dashboard");
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      console.log(error.message);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        {isloading && <Loader />}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <HowToRegIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Register
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
              id="username"
              label="User Name"
              name="username"
              value={username}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={handleChange}
              autoComplete="current-password"
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
              onChange={handleChange}
              autoComplete="confirm-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <Link
                color="inherit"
                to="/register"
                style={{ textDecoration: "none", color: "white" }}
              >
                Sign Up
              </Link>
            </Button>
            {/* login if the user has an account */}
            <Grid container>
              <Grid item xs>
                <Link to="/" variant="body2">
                  Home
                </Link>
              </Grid>
              <Grid item>
                <Link to="/login" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
            {/* or return back to home page */}
          </Box>
        </Box>
        {/* end form */}
      </Container>
    </>
  );
};

export default Register;
