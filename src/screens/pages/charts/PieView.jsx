import { Box, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";

import PieChart from "../../../components/PieChart";
import ChartHeader from "../../../components/ChartHeader";

const PieView = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <ChartHeader title="Stock Statistic" />
        <Box height="75vh" width="60vw">
          <PieChart />
        </Box>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

export default PieView;
