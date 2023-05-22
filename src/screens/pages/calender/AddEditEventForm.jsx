import React, { useState } from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

const AddEditEventForm = ({ onAddClick, deleteClick }) => {
  const events = JSON.parse(localStorage.getItem("events")) || [];
  const [currentEvents, setCurrentEvents] = useState(events);

  return (
    <Box display="flex" justifyContent="space-between" marginTop={"10px"}>
      {/* calendar sidebar */}
      <Box flex="1 1 20%" p="15px" borderRadius="5px">
        <Typography variant="h6">Events</Typography>
        <List>
          {currentEvents.map((event) => (
            <ListItem
              key={event.id}
              sx={{
                margin: "10px 0",
                backgroundColor: "#4CAF50",
                color: "#ccfff5",
                borderRadius: "2px",
              }}
            >
              <ListItemText
                primary={event.title}
                secondary={
                  <Typography>
                    {formatDate(event.start, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* calendar content */}
      <Box flex="1 1 100%" ml="15px">
        <FullCalendar
          height="75vh"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={onAddClick}
          eventClick={deleteClick}
          eventsSet={(events) => setCurrentEvents(events)}
          initialEvents={currentEvents}
        />
      </Box>
    </Box>
  );
};

export default AddEditEventForm;
