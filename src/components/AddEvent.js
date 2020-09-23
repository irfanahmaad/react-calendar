import React, { useState } from "react";
import { Box, Button, Fade, Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

function AddEvent() {
  const classes = useStyles();
  const [form, setForm] = useState({
    name: null,
    startTime: null,
    endTime: null,
  });

  const [open, setOpen] = useState(true);
  // const [active, setActive] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Modal className="modal" open={open} onClose={handleClose}>
      <Fade in={open}>
        <div className="modal__wrapper">
          <div className="modal__wrapper__header">
            <strong>Add Event</strong>
          </div>
          <div className="modal__wrapper__body">
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                label="Add title"
                value={form.name}
                mb={2}
              />
              <TextField
                id="start-time"
                label="Start"
                type="time"
                defaultValue="00:00"
                value={form.startTime}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
              <TextField
                id="end-time"
                label="End"
                type="time"
                value={form.endTime}
                defaultValue="00:00"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
              <Box mt={3} mx={1}>
                <Button variant="contained" color="primary" fullWidth="true">
                  Submit
                </Button>
              </Box>
            </form>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

export default AddEvent;
