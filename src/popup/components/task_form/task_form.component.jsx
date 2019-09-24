import React from "react";
import { Form } from "formik";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import withLoad from "./task_form-load.hoc";
import formHoc from "./task_form-form.hoc";
import "./index.css";

class TaskForm extends React.Component {
  renderField = ({
    type = "text",
    name,
    placeholder,
    renderOptions,
    onChange
  }) => {
    const { touched, errors } = this.props;

    const componentProps = {
      name,
      id: name,
      label: placeholder,
      error: !!errors[name] && touched[name],
      fullWidth: true,
      onChange: e => {
        onChange && onChange(e.target.value);
        this.props.setFieldValue(name, e.target.value);
      }
    };

    return (
      <div key={name}>
        {renderOptions ? (
          <>
            <InputLabel shrink>{placeholder}</InputLabel>
            <Select
              {...componentProps}
              children={renderOptions && renderOptions()}
            />
          </>
        ) : (
          <TextField
            {...componentProps}
            type={type}
            helperText={touched[name] ? errors[name] : ""}
          />
        )}
      </div>
    );
  };

  render() {
    const {
      loadedData: { sprintsList, projects },
      updateSprintList
    } = this.props;

    const fieldsList = [
      {
        placeholder: "project",
        name: "project",
        renderOptions: () =>
          projects.map(item => (
            <MenuItem value={item.id}>{item.name}</MenuItem>
          )),
        onChange: updateSprintList
      },
      {
        placeholder: "title",
        name: "title"
      },
      {
        placeholder: "description",
        name: "description"
      },
      {
        placeholder: "estimated time (minutes)",
        name: "time",
        type: "number"
      },
      {
        placeholder: "parent task (sprint)",
        name: "sprint",
        renderOptions: () =>
          sprintsList.map(item => (
            <MenuItem value={item.id}>{item.title}</MenuItem>
          ))
      }
    ];

    return (
      <div className="task_form_wrapper">
        <Form>
          <div>
            <Typography variant="h5" gutterBottom>
              Create task form
            </Typography>
            {fieldsList.map(item => this.renderField(item))}
            <Button variant="contained" color="secondary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export const TaskFormComponent = withLoad(formHoc(TaskForm));
