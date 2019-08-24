import React from "react";
import { Form, Field, ErrorMessage } from "formik";

import withLoad from "./load.hoc";
import formHoc from "./form.hoc";

class TaskForm extends React.Component {
  renderField = props => (
    <div>
      <Field
        {...props}
        type={props.type || "text"}
        component={props.component || "div"}
        placeholder={props.component || "please input data"}
        name={props.name}
      >
        {props.renderChildrenFn && props.renderChildrenFn()}
      </Field>
      <ErrorMessage name={props.name} component="div" />
    </div>
  );

  render() {
    const {
      loadedData: { sprintsList }
    } = this.props;

    const fieldsList = [
      {
        placeholder: "Title",
        name: "title"
      },
      {
        placeholder: "Description",
        name: "description",
        component: "textarea",

        rows: "4",
        cols: "40"
      },
      {
        placeholder: "Estimated time (minutes)",
        name: "time",
        type: "number"
      },
      {
        component: "select",
        name: "sprint",
        renderChildrenFn: () =>
          sprintsList.map(item => <option value={item.id}>{item.title}</option>)
      }
    ];

    return (
      <Form>
        {fieldsList.map(item => this.renderField(item))}
        <button type="submit">Submit</button>
      </Form>
    );
  }
}

export const TaskFormComponent = withLoad(formHoc(TaskForm));
