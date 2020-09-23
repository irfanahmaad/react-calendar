import {
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./sass/_global.scss";
import { days, dayOfWeek, month } from "./utils/utils";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

const initialForm = {
  title: "",
  startTime: "07:30",
  endTime: "10:30",
  edit: false,
};

function App() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [eventTemp, setEventTemp] = useState(0);

  const currentDate = new Date();
  const [event, setEvent] = useState(() => {
    const localData = localStorage.getItem("events");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(event));
    resetForm();
  }, [event]);

  const handleClose = () => {
    setEventTemp(0);
    setOpen(false);
  };

  const handleOpen = (days) => {
    if (validateDays(days)) {
      alert("Max 3 schedule in a day");
    } else {
      setEventTemp(days);
      setOpen(true);
    }
  };

  const validateDays = (days) => {
    const checkPresence = event.filter((item) => {
      return item.days === days;
    });

    return checkPresence.length > 2 ? true : false;
  };

  const onSubmit = () => {
    form.edit ? updateEvent() : addEvent();
  };

  const addEvent = () => {
    const addEvent = [
      ...event,
      {
        _id: event.length,
        days: eventTemp,
        title: form.title,
        startTime: form.startTime,
        endTime: form.endTime,
        inviteesByEmail: "example@gmail.com",
        backgroundColor: Math.floor(Math.random() * 16777215).toString(16),
      },
    ];

    setEvent(addEvent);
    setOpen(false);
  };

  const updateEvent = () => {
    const eventIndex = event.findIndex((item) => item._id === form._id);
    let cloneEvent = [...event];

    cloneEvent[eventIndex] = {
      ...cloneEvent[eventIndex],
      title: form.title,
      startTime: form.startTime,
      endTime: form.endTime,
    };
    setEvent(cloneEvent);
    setOpen(false);
  };

  const deleteEvent = () => {
    const cloneExceptId = event.filter((item) => item._id !== form._id);
    setEvent(cloneExceptId);
    setOpen(false);
  };

  const resetForm = () => {
    setForm(initialForm);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const activeDateClass = (days) => {
    const defaultItem = "calendar__days";

    return days === currentDate.getDate()
      ? `${defaultItem} calendar__days--active`
      : defaultItem;
  };

  const displayEvent = (days) => {
    const findEvent = event.filter((item) => {
      return item.days === days;
    });

    return findEvent;
  };

  const limitString = (str) => {
    return str.length > 15 ? str.substr(1, 15) + "..." : str;
  };

  const editEvent = (params) => {
    setForm({
      ...form,
      title: params.title,
      startTime: params.startTime,
      endTime: params.endTime,
      edit: true,
      _id: params._id,
    });
    setOpen(true);
  };

  return (
    <div className="App">
      <Modal className="modal" open={open} onClose={handleClose}>
        <Fade in={open}>
          <div className="modal__wrapper">
            <div className="modal__wrapper__header">
              <strong>{form.edit ? "Edit Event" : "Add Event"}</strong>
            </div>
            <div className="modal__wrapper__body">
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="standard-basic"
                  label="Add title"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  mb={2}
                />
                <TextField
                  id="start-time"
                  label="Start Time"
                  type="time"
                  defaultValue="07:30"
                  value={form.startTime}
                  name="startTime"
                  onChange={handleFormChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
                <TextField
                  id="end-time"
                  label="End Time"
                  type="time"
                  defaultValue="08:30"
                  value={form.endTime}
                  name="endTime"
                  onChange={handleFormChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
                <Box mt={3} mx={1}>
                  <Button
                    onClick={onSubmit}
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>

                  {form.edit ? (
                    <Button
                      onClick={deleteEvent}
                      variant="contained"
                      color="danger"
                    >
                      Delete
                    </Button>
                  ) : (
                    ""
                  )}
                </Box>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>

      <div className="calendar">
        <h2>{`${
          month[currentDate.getMonth()]
        } ${currentDate.getFullYear()} `}</h2>
        <div className="calendar__main">
          <div className="calendar__dayOfWeek">
            {dayOfWeek.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
          <div className="calendar__dateGrid">
            {days.map((item, index) => (
              <div key={index}>
                <div className={activeDateClass(item)}>
                  <strong>{item}</strong>
                </div>
                <div className="calendar__action">
                  <IconButton onClick={() => handleOpen(item)}>
                    <Add />
                  </IconButton>
                </div>

                <div className="calendar__listSchedule">
                  {displayEvent(item).map((schedule, index) => (
                    <small
                      style={{
                        backgroundColor: "#" + schedule.backgroundColor,
                      }}
                      key={index}
                      onClick={() => editEvent(schedule)}
                    >
                      {limitString(schedule.title)}
                    </small>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
