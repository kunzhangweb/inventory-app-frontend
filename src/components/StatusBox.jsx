import { Box, Typography } from "@mui/material";
import React from "react";

const StatusBox = ({ title, subtitle, icon }) => {
  return (
    <Box width="100%" p="20px 0" display="flex" justifyContent="space-around">
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#3CAF50" }}>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ color: "#4CAF50" }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatusBox;
