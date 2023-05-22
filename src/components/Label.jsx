import React from "react";
import { makeStyles } from "@mui/styles";
import { Fade } from "@mui/material";

const Label = ({
  className = "",
  color = "secondary",
  children,
  style,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <span className={[classes.root, classes.color, { ...rest }]}>
      {children}
    </span>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    alignItems: "center",
    borderRadius: 2,
    display: "inline-flex",
    flexGrow: 0,
    whiteSpace: "nowrap",
    cursor: "default",
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightMedium,
    height: 20,
    justifyContent: "center",
    letterSpacing: 0.5,
    minWidth: 20,
    padding: theme.spacing(0.5, 1),
    textTransform: "uppercase",
  },
  primary: {
    color: theme.palette.primary.main,
    backgroundColor: Fade(theme.palette.primary.main, 0.08),
  },
  secondary: {
    color: theme.palette.secondary.main,
    backgroundColor: Fade(theme.palette.secondary.main, 0.08),
  },
  error: {
    color: theme.palette.error.main,
    backgroundColor: Fade(theme.palette.error.main, 0.08),
  },
  success: {
    color: theme.palette.success.main,
    backgroundColor: Fade(theme.palette.success.main, 0.08),
  },
  warning: {
    color: theme.palette.warning.main,
    backgroundColor: Fade(theme.palette.warning.main, 0.08),
  },
}));

export default Label;
