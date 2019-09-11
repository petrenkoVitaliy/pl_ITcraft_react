import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';

import formHoc from './form.hoc';
import withLoad from './load.hoc';

import { Container, Button, Sprite } from 'nes-react';

export class Settings extends React.Component {
  renderField = (fieldName, placeHolder, type = 'text', disabled = false) => (
    <div key={fieldName}>
      <label>{fieldName}</label>
      <Field
        type={type}
        placeholder={placeHolder}
        name={fieldName}
        disabled={disabled}
        label={placeHolder}
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
        fieldName: 'appKey',
        placeHolder: 'appKey',
        disabled: true
      }
    ];

    return (
      <Form>
        <Container title='Settings form'>
          {fieldsList.map(({ fieldName, placeHolder, type, disabled }) =>
            this.renderField(fieldName, placeHolder, type, disabled)
          )}
          <Button success type='submit'>
            Submit
          </Button>
          <div className='logger'>
            {/*Logger.getLogs().map(item => (
            <p>{item}</p>
          ))*/}
          </div>
          <Sprite style={{ margin: 5 }} sprite='octocat' />
        </Container>
      </Form>
    );
  }
}

export const SettingsComponent = withLoad(formHoc(Settings));
