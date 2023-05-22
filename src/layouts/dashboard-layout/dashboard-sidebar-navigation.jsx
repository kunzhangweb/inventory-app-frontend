import {
  Toolbar,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
  ListSubheader,
  ListItem,
  Collapse,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useRouteMatch } from "react-router";
import { Link, useHistory } from "react-router-dom";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ThreePIcon from "@mui/icons-material/ThreeP";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PieChartIcon from "@mui/icons-material/PieChart";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import { logoutUser } from "../../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { selectedUser, SET_LOGIN } from "../../redux/features/auth/AuthSlice";

const DashboardSidebarNavigation = ({ isMobile }) => {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const [open, setOpen] = useState(false);

  const { username, photo } = useSelector(selectedUser);

  const handleClick = () => {
    setOpen(!open);
  };

  // logout process
  const dispatch = useDispatch();
  const navigate = useHistory();
  const handleLogout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    localStorage.removeItem("isLoggedIn");
    navigate.push("/");
  };

  return (
    <div>
      {/* logo */}
      <Toolbar
        className={classes.toolbar}
        style={{ width: "6rem", height: "auto" }}
      >
        {!isMobile && username && (
          <Box p={2}>
            <Box display="flex" justifyContent="center">
              <Avatar alt="User" className={classes.avatar} src={photo} />
            </Box>
            <Box mt={2} textAlign="center">
              <Typography variant="body1" color="textSecondary">
                {username}
              </Typography>
            </Box>
          </Box>
        )}
      </Toolbar>
      <Divider />
      {/* menu list */}
      <div classes={classes.drawerContainer}>
        <List>
          <ListSubheader>Home</ListSubheader>
          {/* default dashboard content */}
          <Link className={classes.link} to={`${url}/dashboard`}>
            <ListItem>
              <ListItemIcon className={classes.listIcon}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItem>
          </Link>

          {/* management options */}
          <ListSubheader>Administration</ListSubheader>
          <ListItem onClick={handleClick}>
            <ListItemIcon className={classes.listIcon}>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary={"Account"} />
            {open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {/* profile section */}
            <List component="div">
              <Link className={classes.link} to={`${url}/profile`}>
                <ListItem style={{ paddingLeft: "2rem" }}>
                  <ListItemIcon>
                    <ThreePIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Profile"} />
                </ListItem>
              </Link>
              {/* edit section */}
              <Link className={classes.link} to={`${url}/edit-profile`}>
                <ListItem style={{ paddingLeft: "2rem" }}>
                  <ListItemIcon>
                    <DesignServicesIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Edit Profile"} />
                </ListItem>
              </Link>
              {/* change password section */}
              <Link className={classes.link} to={`${url}/security`}>
                <ListItem style={{ paddingLeft: "2rem" }}>
                  <ListItemIcon>
                    <VpnKeyIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Security"} />
                </ListItem>
              </Link>
            </List>
          </Collapse>
          {/* end sub menu of account */}

          <Link className={classes.link} to={`${url}/add`}>
            <ListItem>
              <ListItemIcon>
                <PostAddIcon />
              </ListItemIcon>
              <ListItemText primary={"Add Product"} />
            </ListItem>
          </Link>
          <Link className={classes.link} to={`${url}/issue`}>
            <ListItem>
              <ListItemIcon>
                <LiveHelpIcon />
              </ListItemIcon>
              <ListItemText primary={"Issue Report"} />
            </ListItem>
          </Link>
          <Link className={classes.link} to={`${url}/schedule`}>
            <ListItem>
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary={"Schedule"} />
            </ListItem>
          </Link>
        </List>

        {/* charts */}
        <List>
          <ListSubheader>Charts</ListSubheader>
          <Link className={classes.link} to={`${url}/pie`}>
            <ListItem>
              <ListItemIcon>
                <PieChartIcon />
              </ListItemIcon>
              <ListItemText primary={"Pie"} />
            </ListItem>
          </Link>
        </List>
        <Divider />

        {/* exit */}
        <List>
          <Link className={classes.link} to="#">
            <ListItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </Link>
        </List>
      </div>
      {/* end menu list */}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  drawerContainer: {
    overflow: "auto",
  },
  logoWidthLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
  },
  link: { textDecoration: "none", color: "inherit" },
  listIcon: {},
  nested: { paddingLeft: theme.spacing(4) },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

export default DashboardSidebarNavigation;
