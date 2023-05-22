import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../../services/AuthService";
import { SET_NAME, SET_USER } from "../../../redux/features/auth/AuthSlice";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Divider,
  ListItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";

const ProfileView = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    async function getUserData() {
      const userData = await getUser();

      setProfile(userData);
      setIsLoading(false);
      await dispatch(SET_USER(userData));
      await dispatch(SET_NAME(userData.name));
    }

    getUserData();
  }, [dispatch]);

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
          <Card sx={{ maxWidth: 645 }}>
            {!isLoading && profile === null ? (
              <Typography gutterBottom variant="h5" component="div">
                No information abou this employee, please reload the page.
              </Typography>
            ) : (
              <>
                <CardMedia
                  component="img"
                  height="330"
                  image={profile?.photo}
                  alt={"/src/assets/JohnDoe.png"}
                />
                <CardContent>
                  <ListItem>
                    <Typography variant="body1">Name:</Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ padding: "2px" }}
                    >
                      {profile?.username}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1">Email: </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ padding: "2px" }}
                    >
                      {profile?.email}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1">Phone#: </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ padding: "2px" }}
                    >
                      {profile?.phone}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1">Biography: </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ padding: "2px" }}
                    >
                      {profile?.biography}
                    </Typography>
                  </ListItem>

                  <Divider />
                  <Link to={"/dashboard/edit-profile"}>
                    <Button
                      size="medium"
                      color="primary"
                      sx={{ margin: "4px" }}
                    >
                      Edit Profile
                    </Button>
                  </Link>
                </CardContent>
              </>
            )}
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

export default ProfileView;
