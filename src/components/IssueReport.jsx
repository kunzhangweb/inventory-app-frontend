import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  ListItem,
  TextareaAutosize,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Axios from "axios";
import { Backend_Base_URL } from "../services/AuthService";
import { toast } from "react-toastify";

import {
  PhoneCall as PhoneIcon,
  Mail as EmailIcon,
  MapPin as LocationIcon,
  Twitter as TwitIcon,
} from "react-feather";

const IssueReport = () => {
  const classes = useStyles();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const isMobile = useMediaQuery("(max-width: 650px)");
  const report = {
    subject,
    message,
  };

  const sendReport = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post(
        `${Backend_Base_URL}/api/contact`,
        report
      );
      setSubject("");
      setMessage("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className={classes.root}>
      <Container
        maxWidth="false"
        sx={isMobile ? { flexDirection: "column" } : { display: "flex" }}
      >
        <Card sx={{ width: "400px", padding: "10px", margin: "3px" }}>
          <CardContent>
            <Box component="form" onSubmit={sendReport} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="subject"
                label="Subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                autoFocus
              />
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                color="text.secondary"
              >
                Issue Description:
              </Typography>
              <TextareaAutosize
                style={{ width: 360 }}
                minRows={10}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button type="submit" variant="outlined" sx={{ mt: 1 }}>
                Send Report
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ width: "400px", padding: "10px", margin: "3px" }}>
          <CardContent>
            <Box component="form" onSubmit={sendReport} noValidate>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                color="text.secondary"
              >
                If you have any question, please feel free to contact our
                dedicated Customer Support Via The Following Channels
              </Typography>
              <Typography
                gutterBottom
                variant="h7"
                component="div"
                color="text.secondary"
              >
                Team at Everyday Beauty LLC will reply to you within two
                business days.
              </Typography>

              <ListItem>
                <PhoneIcon />
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  color="text.secondary"
                  marginLeft={"5px"}
                >
                  (718) 353-9788
                </Typography>
              </ListItem>
              <ListItem>
                <EmailIcon />
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  color="text.secondary"
                  marginLeft={"5px"}
                >
                  support@everydayemall.com
                </Typography>
              </ListItem>
              <ListItem>
                <TwitIcon />
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  color="text.secondary"
                  marginLeft={"5px"}
                >
                  @everydayemall
                </Typography>
              </ListItem>
              <ListItem>
                <LocationIcon size={"36px"} />
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  color="text.secondary"
                  marginLeft={"5px"}
                >
                  Brooklyn Navy Yard 63 Flushing Ave Brooklyn, NY11205
                </Typography>
              </ListItem>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    padding: theme.spacing(3),
    paddingBottom: 100,
  },
}));

export default IssueReport;
