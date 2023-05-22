import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../../utils/EmailValidation";
import { loginUser } from "../../../services/AuthService";
import { SET_LOGIN, SET_NAME } from "../../../redux/features/auth/AuthSlice";
import Loader from "../../../components/Loader";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [isloading, setIsloading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useHistory();
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  // when the values of text fields change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // submit the login form
  const handleSubmit = async (event) => {
    event.preventDefault();

    /** data validation */
    if (!email || !password) {
      return toast.error("Please enter some data in each field.");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email address.");
    }

    // process the login data
    const userData = {
      email,
      password,
    };
    setIsloading(true);
    try {
      const data = await loginUser(userData);
      console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.username));
      navigate.push("/dashboard/dashboard");
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
    }
  };

  return (
    <>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {isloading && <Loader />}
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inventory Management
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={handleChange}
              autoComplete="email"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </Box>

          {/* password reset and sign up */}
          <Grid container>
            <Grid item xs>
              <Link href="/forgot" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>

          {/* copy right */}
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 5 }}
          >
            {"Copyright © "}
            <Link color="inherit" href="https://www.everydayemall.com/">
              Everyday Group LLC
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export default Login;
