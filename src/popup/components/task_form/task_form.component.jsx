import React from "react";
import { Form, Field, ErrorMessage } from "formik";

import formHoc from "./form.hoc";

class TaskForm extends React.Component {
  render() {
    return (
      <Form>
        <div>
          <Field type="text" placeholder="Title" name="title" />
          <ErrorMessage name="title" component="div" />
        </div>

        <div>
          <Field
            type="text"
            component="textarea"
            rows="4"
            cols="40"
            placeholder="Description"
            name="description"
          />
          <ErrorMessage name="description" component="div" />
        </div>

        <div>
          <Field type="text" placeholder="Estimated time" name="time" />
          <ErrorMessage name="time" component="div" />
        </div>

        <div>
          <Field component="select" name="sprint">
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </Field>
          <ErrorMessage name="sprint" component="div" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    );
  }
}

export const TaskFormComponent = formHoc(TaskForm);
