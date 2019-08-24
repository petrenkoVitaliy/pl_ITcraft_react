import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';

import formHoc from './form.hoc';
import withLoad from './load.hoc';
import './index.css';

export class Settings extends React.Component {
  render() {
    return (
      <Form>
        <div>
          <label htmlFor='userKey'>userKey</label>
          <Field type='text' placeholder='userKey' name='userKey' />
          <ErrorMessage name='userKey' component='div' />
        </div>
        <div>
          <label htmlFor='managerKey'>managerKey</label>
          <Field type='text' placeholder='managerKey' name='managerKey' />
          <ErrorMessage name='managerKey' component='div' />
        </div>
        <div>
          <label htmlFor='projectId'>projectId</label>
          <Field
            disabled
            type='text'
            placeholder='projectId'
            name='projectId'
          />
          <ErrorMessage name='projectId' component='div' />
        </div>
        <div>
          <label htmlFor='appKey'>appKey</label>
          <Field disabled type='text' placeholder='appKey' name='appKey' />
          <ErrorMessage name='appKey' component='div' />
        </div>
        <button type='submit'>Submit</button>
      </Form>
    );
  }
}

export const SettingsComponent = withLoad(formHoc(Settings));
