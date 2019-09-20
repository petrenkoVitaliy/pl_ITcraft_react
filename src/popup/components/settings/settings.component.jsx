import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import { Container, Button, Sprite } from 'nes-react';

import formHoc from './settings-form.hoc';
import withLoad from './settings-load.hoc';
import './index.css';
export class Settings extends React.Component {
  renderField = (
    fieldName,
    placeHolder,
    type = 'text',
    disabled = false,
    label
  ) => (
    <div key={fieldName} className='field_wrap'>
      <label>{label}</label>
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
        label: 'userKey',
        placeHolder: 'userKey'
      },
      {
        fieldName: 'managerKey',
        label: 'managerKey',
        placeHolder: 'managerKey'
      },
      {
        fieldName: 'appKey',
        label: 'appKey',
        placeHolder: 'appKey',
        disabled: true
      },
      ...this.props.values.projectsMap
        .map((item, index) => [
          {
            fieldName: `projectsMap.${index}.name`,
            disabled: true
          },
          {
            fieldName: `projectsMap.${index}.code`,
            placeHolder: 'projectKey'
          }
        ])
        .flat(1)
    ];

    return (
      <Form>
        <Container title='Settings form'>
          {fieldsList.map(({ fieldName, placeHolder, type, disabled, label }) =>
            this.renderField(fieldName, placeHolder, type, disabled, label)
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
