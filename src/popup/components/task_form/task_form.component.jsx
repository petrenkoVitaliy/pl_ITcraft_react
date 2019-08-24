import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';

import withLoad from './load.hoc';
import formHoc from './form.hoc';

class TaskForm extends React.Component {
  render() {
    const {
      loadedData: { sprintsList }
    } = this.props;
    return (
      <Form>
        <div>
          <Field type='text' placeholder='Title' name='title' />
          <ErrorMessage name='title' component='div' />
        </div>

        <div>
          <Field
            type='text'
            component='textarea'
            rows='4'
            cols='40'
            placeholder='Description'
            name='description'
          />
          <ErrorMessage name='description' component='div' />
        </div>

        <div>
          <Field
            type='number'
            placeholder='Estimated time (minutes)'
            name='time'
          />
          <ErrorMessage name='time' component='div' />
        </div>

        <div>
          <Field component='select' name='sprint'>
            {sprintsList.map(item => (
              <option value={item.id}>{item.title}</option>
            ))}
          </Field>
          <ErrorMessage name='sprint' component='div' />
        </div>

        <button type='submit'>Submit</button>
      </Form>
    );
  }
}

export const TaskFormComponent = withLoad(formHoc(TaskForm));
