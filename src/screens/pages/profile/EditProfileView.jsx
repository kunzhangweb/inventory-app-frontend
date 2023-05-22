import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../redux/features/auth/AuthSlice";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Divider,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import Loader from "../../../components/Loader";
import { useHistory } from "react-router-dom";

import { updateUser } from "../../../services/AuthService";
import { toast } from "react-toastify";

const EditProfileView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectedUser);

  const initialState = {
    username: user?.username,
    email: user?.email,
    phone: user?.phone,
    photo: user?.photo,
    biography: user?.biography,
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");
  const classes = useStyles();

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (event) => {
    setProfileImage(event.taret.files[0]);
  };

  const saveProfile = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    // handle image uploading
    try {
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "dskzfazc9");
        image.append("upload_preset", "loxdugbr");

        // upload the image to the cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dskzfazc9/image/upload",
          { method: "post", body: image }
        );
        const imageData = await response.json(); // contain image url
        let imageURL = imageData.url.toString();

        // save the profile
        const formData = {
          username: profile.username,
          phone: profile.phone,
          biography: profile.biography,
          photo: profileImage ? imageURL : profile.photo,
        };
        const data = await updateUser(formData);
        console.log(data);
        toast.success("User updated successfully!");
        navigate.push("/dashboard/profile");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const { email } = user;
  const navigate = useHistory();
  useEffect(() => {
    if (!email) {
      navigate.push("/dashboard/profile");
    }
  }, [email, navigate]);

  return (
    <div className={classes.root}>
      <Container>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isLoading && <Loader />}
          <Card sx={{ maxWidth: 545, padding: "10px" }}>
            <CardMedia
              component="img"
              height="430"
              image={user?.photo}
              alt={"/src/assets/JohnDoe.png"}
            />
            <CardContent>
              <Box component="form" onSubmit={saveProfile} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="User Name"
                  name="name"
                  value={user?.username}
                  onChange={handleFieldChange}
                  autoFocus
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={user?.email}
                  disabled
                />
                <Typography
                  gutterBottom
                  variant="body2"
                  component="div"
                  color="text.secondary"
                >
                  Email address can not be modified once the user logged in.
                </Typography>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  value={user?.phone}
                  onChange={handleFieldChange}
                  autoFocus
                />
                <Typography gutterBottom variant="h6" component="div">
                  Biograhpy:
                </Typography>
                <TextareaAutosize
                  label="Biograhpy"
                  value={user?.biography}
                  minRows={6}
                  onChange={handleFieldChange}
                  style={{ width: 500 }}
                />
                <Typography gutterBottom variant="h6" component="div">
                  Photo:
                </Typography>
                <TextField
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  sx={{ mb: 1 }}
                />
              </Box>

              <Divider />
              <Button type="submit" variant="outlined" sx={{ mt: 1 }}>
                Update Profile
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    display: "flex",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: theme.spacing(2),
    paddingBottom: 100,
  },
}));
export default EditProfileView;
