import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';

import formHoc from './form.hoc';
import withLoad from './load.hoc';

import './index.css';

export class Settings extends React.Component {
  renderField = (fieldName, placeHolder, type = 'text', disabled = false) => (
    <div>
      <label htmlFor={fieldName}>{placeHolder}</label>
      <Field
        type={type}
        placeholder={placeHolder}
        name={fieldName}
        disabled={disabled}
      />
      <ErrorMessage name={fieldName} component='div' />
    </div>
  );

  render() {
    const fieldsList = [
      {
        fieldName: 'userKey',
        placeHolder: 'userKey'
      },
      {
        fieldName: 'managerKey',
        placeHolder: 'managerKey'
      },
      {
        fieldName: 'projectId',
        placeHolder: 'projectId'
      },
      {
        fieldName: 'appKey',
        placeHolder: 'appKey'
      }
    ];

    return (
      <Form>
        {fieldsList.map(({ fieldName, placeHolder, type, disabled }) =>
          this.renderField(fieldName, placeHolder, type, disabled)
        )}
        <button type='submit'>Submit</button>
        <div className='logger'>
          {/*Logger.getLogs().map(item => (
            <p>{item}</p>
          ))*/}
        </div>
      </Form>
    );
  }
}

export const SettingsComponent = withLoad(formHoc(Settings));
