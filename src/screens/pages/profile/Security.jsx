import { LockReset as LockResetIcon } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "../../../services/AuthService";

const initialState = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const Security = () => {
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, newPassword, confirmPassword } = formData;

  const handlePwdChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("New password entered do not match.");
    }

    const formData = {
      oldPassword,
      newPassword,
    };

    const data = await changePassword(formData);
    toast.success(data);
  };

  return (
    <Container component="main">
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
          Change Password
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: "60%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="oldPassword"
            label="Previous Password"
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={handlePwdChange}
            autoComplete="previous-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="newPassword"
            value={newPassword}
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
        </Box>
      </Box>
      {/* end form */}
    </Container>
  );
};

export default Security;
