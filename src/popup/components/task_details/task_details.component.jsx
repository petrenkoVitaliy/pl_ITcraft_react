import React from "react";
import moment from "moment";

import Button from "@material-ui/core/Button";
import { Form } from "formik";
import Typography from "@material-ui/core/Typography";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import withLoad from "./task_details-load.hoc";
import { LoaderComponent } from "../../../loader";
import formHoc from "./task_details-form.hoc.jsx";
import "./index.css";

class TaskDetails extends React.Component {
  state = {
    shownPostIndex: undefined
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.isSubmitting === true &&
      this.props.isSubmitting === false &&
      this.props.values.taken
    ) {
      this.setState({
        shownPostIndex: undefined
      });
    }
  }

  showPostForm = (index, taskId) => {
    this.props.setFieldValue("taskId", taskId);

    this.setState({
      shownPostIndex: this.state.shownPostIndex === index ? undefined : index
    });
  };

  closePostForm = () => {
    this.setState({
      shownPostIndex: undefined
    });
  };

  renderTaskDetailsField = (label, value) =>
    value && (
      <>
        <div className="title_label">
          <Typography variant="subtitle1" gutterBottom>
            {`${label}:`}
          </Typography>
        </div>
        <div className="input_label">
          <Typography variant="body1" gutterBottom>
            {value}
          </Typography>
        </div>
      </>
    );

  renderPostForm = () => {
    const { errors, touched, handleChange } = this.props;
    return (
      <>
        <div>
          <TextField
            name="description"
            id="description"
            label="Description"
            error={!!errors.description && touched.description}
            onChange={handleChange}
            helperText={touched.description ? errors.description : ""}
            fullWidth
          />
        </div>
        <div>
          <TextField
            name="taken"
            type="number"
            id="taken"
            label="Time taken (in hours)"
            error={!!errors.taken && touched.taken}
            onChange={handleChange}
            helperText={touched.taken ? errors.taken : ""}
            fullWidth
          />
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              name="date"
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              value={this.props.values.date}
              onChange={value => {
                this.props.setFieldValue("date", value);
              }}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              maxDate={moment()}
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </div>
        <div>
          <TextField
            name="taskId"
            id="taskId"
            label="Task id"
            fullWidth
            disabled
          />
        </div>
        <div>
          <TextField
            name="projectId"
            id="projectId"
            label="Project id"
            fullWidth
            disabled
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Post
        </Button>
      </>
    );
  };

  render() {
    const {
      taskNumber,
      taskData = [],
      uploadPage,
      setFieldValue,
      projectsList,
      changeProjectId
    } = this.props;

    const { shownPostIndex } = this.state;

    const fieldsList = taskData.map(item => [
      {
        label: "Task id",
        value: item.id
      },
      {
        label: "Task number",
        value: taskNumber
      },
      {
        label: "Description",
        value: item.description
      },
      {
        label: "Path",
        value: item.pathHuman
      },
      {
        label: "Time taken",
        value: item["time-taken"]
      },
      {
        label: "Time approve",
        value: item["time-approved"]
      },
      {
        label: "Time effort",
        value: item["time-effort"]
      }
    ]);

    return (
      <div>
        <Typography variant="h5" gutterBottom>
          Task Info
        </Typography>
        <Form>
          <Select
            name={"projectId"}
            children={projectsList.map(item => (
              <MenuItem value={item.id}>{item.name}</MenuItem>
            ))}
            onChange={e => {
              changeProjectId(e.target.value);
              setFieldValue("projectId", e.target.value);
            }}
          />

          {taskNumber ? (
            <>
              {fieldsList.map((task, index) => (
                <div>
                  <Typography variant="h6" gutterBottom>
                    {`Task # ${index + 1}`}
                  </Typography>
                  {task.map(({ label, value }) =>
                    this.renderTaskDetailsField(label, value)
                  )}
                  <Button
                    type="button"
                    variant="contained"
                    onClick={
                      shownPostIndex === index
                        ? this.closePostForm
                        : () => this.showPostForm(index, task[0].value)
                    }
                  >
                    {`${
                      shownPostIndex === index ? "Close" : "Open"
                    } Post Details`}
                  </Button>

                  {shownPostIndex === index && (
                    <div className="postForm">{this.renderPostForm()} </div>
                  )}
                </div>
              ))}
              <Button
                className="reloadBtn"
                variant="contained"
                color="secondary"
                onClick={() => uploadPage()}
                type="button"
              >
                Reload
              </Button>
            </>
          ) : (
            <>
              <div>Cant find task number</div>
              <LoaderComponent />
            </>
          )}
        </Form>
      </div>
    );
  }
}

export const TaskDetailsComponent = withLoad(formHoc(TaskDetails));
