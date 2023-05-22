import React from "react";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/material";

import Header from "./Header";
import AddEditEventForm from "./AddEditEventForm";

const CalendarView = () => {
  const classes = useStyles();

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
    console.log(calendarApi.getEvents());
    localStorage.setItem("events", JSON.stringify(calendarApi.getEvents()));
  };

  const handleRemoveClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <Header />
        <AddEditEventForm
          onAddClick={handleDateClick}
          deleteClick={handleRemoveClick}
        />
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
export default CalendarView;
