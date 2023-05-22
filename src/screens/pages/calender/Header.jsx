import React from "react";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Grid, Link, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const Header = ({ onAddClick }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="space-between"
      spacing={3}
      className={classes.root}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/dashboard"
            component={RouterLink}
          >
            Dashboard
          </Link>
          <Box>
            <Typography variant="body1" color="inherit">
              Calendar
            </Typography>
          </Box>
          <Typography variant="h6" color="textPrimary">
            Here&apos;s what you planned
          </Typography>
        </Breadcrumbs>
      </Grid>
      {/* <Grid item>
        <Button
          color="primary"
          variant="contained"
          onClick={onAddClick}
          className={classes.action}
          startIcon={
            <SvgIcon fontSize="small">
              <PlusCircleIcon />
            </SvgIcon>
          }
        >
          New Event
        </Button>
      </Grid> */}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    "& + &": {
      marginLeft: theme.spacing(1),
    },
  },
}));

export default Header;
