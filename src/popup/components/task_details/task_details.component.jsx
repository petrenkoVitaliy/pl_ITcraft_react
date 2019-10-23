import React from "react";
import moment from "moment";
import { Form } from "formik";

import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/styles";

import withLoad from "./task_details-load.hoc";
import formHoc from "./task_details-form.hoc.jsx";

const styles = {
  fieldsWrapper: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "18.6px"
  },
  fieldWrapper: {
    width: "100%"
  },
  field: {
    width: "100%",
    margin: 0
  },
  fieldInput: {
    height: 30
  },
  select: {
    height: 30,
    width: "100%",
    margin: 0,
    marginBottom: "10px"
  },
  button: {
    width: "180px",
    height: "35px",
    borderRadius: "25px",
    boxShadow: "none",
    margin: "20px 15px"
  },
  submitBtnWrapper: {
    display: "flex",
    justifyContent: "flex-end"
  },
  text: {
    color: "#19e455",
    fontSize: "17px",
    fontFamily: "Helvetica",
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  infoBlock: {
    height: "80px",
    background: "#e5e7f1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#464646",
    fontSize: "17px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    margin: "10px -20px"
  }
};

class TaskDetails extends React.Component {
  getCommonProps = name => ({
    name,
    id: name,
    className: this.props.classes.field,
    variant: "outlined",
    InputProps: {
      className: this.props.classes.fieldInput
    }
  });

  render() {
    const {
      taskNumber,
      taskData = [],
      setFieldValue,
      projectsList = [],
      changeProjectId,
      values,
      errors,
      touched,
      handleChange,
      classes
    } = this.props;

    return (
      <Form>
        <Box className={classes.fieldsWrapper}>
          <Box className={classes.fieldWrapper} style={{ width: "70%" }}>
            <InputLabel shrink>Project Id</InputLabel>
            <Select
              name="projectId"
              id="projectId"
              variant="outlined"
              InputProps={{
                className: this.props.classes.fieldInput
              }}
              value={values.projectId}
              children={projectsList.map(item => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
              onChange={e => {
                changeProjectId(e.target.value);
                setFieldValue("projectId", e.target.value);
              }}
              className={classes.select}
            />
          </Box>
          <Box className={classes.fieldWrapper} style={{ width: "25%" }}>
            <InputLabel shrink>Task number</InputLabel>
            <TextField
              {...this.getCommonProps("taskNumber")}
              value={taskNumber}
              error={!!errors.taskNumber && touched.taskNumber}
              helperText={touched.taskNumber ? errors.taskNumber : ""}
              disabled
            />
          </Box>
        </Box>
        {taskData.description ? (
          <>
            <Box className={classes.fieldsWrapper}>
              <Box className={classes.fieldWrapper}>
                <InputLabel shrink>Task Name</InputLabel>
                <TextField
                  {...this.getCommonProps("task-description")}
                  value={taskData.description}
                  disabled
                />
              </Box>
            </Box>
            <Box className={classes.fieldsWrapper}>
              <Box className={classes.fieldWrapper} style={{ width: "25%" }}>
                <Typography variant="h5" gutterBottom className={classes.text}>
                  post details
                </Typography>
              </Box>
              <Box
                className={classes.fieldWrapper}
                style={{ borderBottom: "2px dashed #3f51b5", width: "75%" }}
              ></Box>
            </Box>
            <Box className={classes.fieldsWrapper}>
              <Box className={classes.fieldWrapper} style={{ width: "60%" }}>
                <InputLabel shrink>Description</InputLabel>
                <TextField
                  name="description"
                  id="description"
                  onChange={handleChange}
                  variant="outlined"
                  value={values.description}
                  error={!!errors.description && touched.description}
                  helperText={touched.description ? errors.description : ""}
                  multiline
                  rows={3}
                  rowsMax={3}
                  className={classes.field}
                />
              </Box>
              <Box className={classes.fieldWrapper} style={{ width: "35%" }}>
                <Box className={classes.fieldWrapper}>
                  <InputLabel shrink>Date</InputLabel>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      name="date"
                      disableToolbar
                      inputVariant="outlined"
                      format="MM/dd/yyyy"
                      margin="normal"
                      value={values.date}
                      onChange={value => {
                        setFieldValue("date", value);
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                      maxDate={moment()}
                      className={classes.field}
                      InputProps={{
                        className: this.props.classes.fieldInput
                      }}
                      style={{ marginBottom: "17px" }}
                    />
                  </MuiPickersUtilsProvider>
                </Box>
                <Box>
                  <InputLabel shrink>Time Spend</InputLabel>
                  <TextField
                    {...this.getCommonProps("taken")}
                    type="number"
                    value={values.taken}
                    error={!!errors.taken && touched.taken}
                    onChange={handleChange}
                    helperText={touched.taken ? errors.taken : ""}
                  />
                </Box>
              </Box>
            </Box>
            <Box className={classes.fieldsWrapper}>
              <Box
                className={classes.fieldWrapper}
                style={{ borderBottom: "2px dashed #3f51b5" }}
              ></Box>
            </Box>
            <Box className={classes.fieldsWrapper}>
              <Box className={classes.fieldWrapper} style={{ width: "30%" }}>
                <InputLabel shrink>Time Taken</InputLabel>
                <TextField
                  {...this.getCommonProps("time-taken")}
                  value={taskData["time-taken"]}
                  disabled
                />
              </Box>
              <Box className={classes.fieldWrapper} style={{ width: "30%" }}>
                <InputLabel shrink>Time Approved</InputLabel>
                <TextField
                  {...this.getCommonProps("time-approved")}
                  value={taskData["time-approved"]}
                  disabled
                />
              </Box>
              <Box className={classes.fieldWrapper} style={{ width: "30%" }}>
                <InputLabel shrink>Time Effort</InputLabel>
                <TextField
                  {...this.getCommonProps("time-effort")}
                  value={taskData["time-effort"]}
                  disabled
                />
              </Box>
            </Box>
            <Box className={classes.submitBtnWrapper}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
              >
                Post
              </Button>
            </Box>
          </>
        ) : (
          <Box>
            <Box className={classes.infoBlock}>
              <p>Task does not exist. Want to create a task?</p>
            </Box>
            <Box className={classes.submitBtnWrapper}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => this.props.changeActiveTab(1)}
              >
                Create
              </Button>
            </Box>
          </Box>
        )}
      </Form>
    );
  }
}

export const TaskDetailsComponent = withStyles(styles)(
  withLoad(formHoc(TaskDetails))
);
