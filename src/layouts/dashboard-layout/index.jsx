import { Drawer, Grid } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useRef, useState } from "react";
import { makeStyles } from "@mui/styles";

import NavBar from "../main-layout/navigation-bar";
import DashboardSidebarNavigation from "./dashboard-sidebar-navigation";
import useAlan from "../../components/Alan";

const Dashboard = ({ children }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width: 650px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  const alanBtnContainer = useRef();
  useAlan();

  return (
    <>
      <NavBar isMobile={isMobile} setMobileOpen={setMobileOpen} />
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {isMobile ? (
          <div className={classes.root}>
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <DashboardSidebarNavigation isMobile={isMobile} />
            </Drawer>
          </div>
        ) : (
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
            anchor="left"
          >
            <DashboardSidebarNavigation isMobile={isMobile} />
          </Drawer>
        )}

        {children}
      </Grid>
      <div ref={alanBtnContainer} />
    </>
  );
};

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    dislay: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

export default Dashboard;
