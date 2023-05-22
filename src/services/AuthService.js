import Axios from "axios";
import { toast } from "react-toastify";

export const Backend_Base_URL = process.env.REACT_APP_BACKEND_URL;

// registration
export const registerUser = async (userData) => {
  try {
    const response = await Axios.post(
      `${Backend_Base_URL}/api/users/register`,
      userData
    );

    if (response.statusText === "OK") {
      toast.success("Registered successfully!");
    }

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// login process
export const loginUser = async (userData) => {
  try {
    const response = await Axios.post(
      `${Backend_Base_URL}/api/users/login`,
      userData
    );

    if (response.statusText === "OK") {
      toast.success("Logged in successfully!");
    }

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// logout process
export const logoutUser = async () => {
  try {
    await Axios.get(`${Backend_Base_URL}/api/users/logout`);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// sending reset mail
export const forgotPassword = async (userData) => {
  try {
    const response = await Axios.post(
      `${Backend_Base_URL}/api/users/forgotPwd`,
      userData
    );
    toast.success(response.data.message);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// reset password
export const resetPassword = async (userData, resetToken) => {
  try {
    const response = await Axios.put(
      `${Backend_Base_URL}/api/users/resetPwd/${resetToken}`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// get login status
export const getLoginStatus = async () => {
  try {
    const response = await Axios.get(`${Backend_Base_URL}/api/users/loggedin`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// get user's profile
export const getUser = async () => {
  try {
    const response = await Axios.get(`${Backend_Base_URL}/api/users/getOne`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// update user's profile
export const updateUser = async (formData) => {
  try {
    const response = await Axios.patch(
      `${Backend_Base_URL}/api/users/update`,
      formData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// change user's password
export const changePassword = async (formData) => {
  try {
    const response = await Axios.patch(
      `${Backend_Base_URL}/api/users/changePwd`,
      formData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
