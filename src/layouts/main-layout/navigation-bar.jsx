import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import { ColorModeContext } from "../../utils/ToggleColorMode";

import { useSelector } from "react-redux";
import { selectedUser } from "../../redux/features/auth/AuthSlice";

const NavBar = ({ isMobile, setMobileOpen }) => {
  const classes = useStyles();

  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  const { photo } = useSelector(selectedUser);

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="relative">
        <Toolbar className={classes.toolbar}>
          {/* Desktop and mobile switch */}
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Icons Set */}
          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <Button
            color="inherit"
            component={Link}
            to="#"
            className={classes.linkButton}
            onClick={() => {}}
          >
            <Avatar
              style={{ height: 35, width: 35 }}
              alt="Profile"
              src={photo}
            />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    height: "70px",
    display: "flex",

    justifyContent: "space-between",
    marginLeft: "230px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      flexWrap: "wrap",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export default NavBar;
