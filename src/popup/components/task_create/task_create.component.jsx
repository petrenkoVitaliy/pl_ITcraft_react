import React from "react";
import { Form } from "formik";
import classnames from "classnames";

import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";

import withLoad from "./task_create-load.hoc";
import formHoc from "./task_create-form.hoc";

const styles = {
  field: {
    borderRadius: "6px",
    marginBottom: "20px",
    height: 30
  },
  textArea: {
    height: "auto"
  },
  select: {
    borderRadius: "6px",
    marginBottom: "20px",
    height: "30px"
  },
  fieldsWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
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
  createTaskWrapper: {
    overflow: "auto",
    overflowX: "hidden"
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

class TaskForm extends React.Component {
  getFieldProps = ({ name, onChange }) => ({
    name,
    id: name,
    error: !!this.props.errors[name] && this.props.touched[name],
    fullWidth: true,
    onChange: e => {
      onChange && onChange(e.target.value);
      this.props.setFieldValue(name, e.target.value);
    },
    value: this.props.values[name],
    variant: "outlined"
  });

  renderField = field => {
    const { touched, errors, classes } = this.props;
    const isPaired = Array.isArray(field);
    const fieldsPair = isPaired ? field : [field];

    return (
      <Box className={classes.fieldsWrapper}>
        {fieldsPair.map(fieldData => {
          const {
            type = "text",
            name,
            placeholder,
            renderOptions,
            multiline
          } = fieldData;
          return (
            <Box key={name} style={{ width: isPaired ? "45%" : "100%" }}>
              {renderOptions ? (
                <>
                  <InputLabel shrink>{placeholder}</InputLabel>
                  <Select
                    {...this.getFieldProps(fieldData)}
                    children={renderOptions && renderOptions()}
                    className={classes.select}
                    style={{ width: "100%" }}
                  />
                </>
              ) : (
                <>
                  <InputLabel shrink>{placeholder}</InputLabel>
                  <TextField
                    {...this.getFieldProps(fieldData)}
                    multiline={multiline}
                    rows={4}
                    rowsMax={4}
                    type={type}
                    helperText={touched[name] ? errors[name] : ""}
                    InputProps={{
                      className: classnames(classes.field, {
                        [classes.textArea]: multiline
                      })
                    }}
                    style={{ width: "100%" }}
                  />
                </>
              )}
            </Box>
          );
        })}
      </Box>
    );
  };

  render() {
    const {
      loadedData: { sprintsList, projects, isTaskAlreadyCreated },
      updateSprintList,
      classes
    } = this.props;

    const projectFieldData = [
      {
        placeholder: "Project Name",
        name: "project",
        renderOptions: () =>
          projects.map(item => (
            <MenuItem value={item.id}>{item.name}</MenuItem>
          )),
        onChange: updateSprintList
      }
    ];

    const taskFieldsData = !isTaskAlreadyCreated
      ? [
          {
            placeholder: "Task Name",
            name: "title"
          },
          {
            placeholder: "Description",
            name: "description",
            multiline: true
          },
          [
            {
              placeholder: "Effort time",
              name: "time",
              type: "number"
            },
            {
              placeholder: "Parent Task",
              name: "sprint",
              renderOptions: () =>
                sprintsList.map(item => (
                  <MenuItem value={item.id}>{item.title}</MenuItem>
                ))
            }
          ]
        ]
      : [];

    const fieldsList = [...projectFieldData, ...taskFieldsData];

    return (
      <Form>
        <Box className={classes.createTaskWrapper}>
          {fieldsList.map(this.renderField)}
        </Box>
        {isTaskAlreadyCreated ? (
          <>
            <Box>
              <Box className={classes.infoBlock}>
                <p>Task has already been created</p>
              </Box>
            </Box>
            <Box className={classes.submitBtnWrapper}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={() => this.props.changeActiveTab(0)}
              >
                View Details
              </Button>
            </Box>
          </>
        ) : (
          <Box className={classes.submitBtnWrapper}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => this.props.changeActiveTab(0)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
            >
              Save
            </Button>
          </Box>
        )}
      </Form>
    );
  }
}

export const TaskFormComponent = withStyles(styles)(
  withLoad(formHoc(TaskForm))
);
