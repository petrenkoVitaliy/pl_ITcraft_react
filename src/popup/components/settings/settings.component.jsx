import React from 'react';
import { Form } from 'formik';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import formHoc from './settings-form.hoc';
import withLoad from './settings-load.hoc';
import './index.css';
export class Settings extends React.Component {
  renderField = (fieldName, placeHolder, disabled = false, value) => {
    const { errors, touched, handleChange } = this.props;

    return (
      <div key={fieldName} className='field_wrap'>
        <TextField
          value={value}
          name={fieldName}
          id={fieldName}
          disabled={disabled}
          label={placeHolder}
          error={!!errors[fieldName] && touched[fieldName]}
          onChange={handleChange}
          helperText={touched[fieldName] ? errors[fieldName] : ''}
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
        />
      </div>
    );
  };

  render() {
    const { values } = this.props;

    const fieldsList = [
      {
        fieldName: 'userKey',
        placeHolder: 'userKey',
        value: values.userKey
      },
      {
        fieldName: 'managerKey',
        placeHolder: 'managerKey',
        value: values.managerKey
      },
      {
        fieldName: 'appKey',
        placeHolder: 'appKey',
        disabled: true,
        value: values.appKey
      },
      ...this.props.values.projectsMap
        .map((item, index) => [
          {
            fieldName: `projectsMap.${index}.name`,
            disabled: true,
            value: values.projectsMap[index].name,
            placeHolder: 'projectKey'
          },
          {
            fieldName: `projectsMap.${index}.code`,
            value: values.projectsMap[index].code
          }
        ])
        .flat(1)
    ];

    return (
      <Form>
        <div>
          <Typography variant='h5' gutterBottom>
            Settings form
          </Typography>
          {fieldsList.map(({ fieldName, placeHolder, disabled, value }) =>
            this.renderField(fieldName, placeHolder, disabled, value)
          )}
          <div className='submitBtnWrapper'>
            <Button variant='contained' color='secondary' type='submit'>
              Submit
            </Button>
          </div>
        </div>
      </Form>
    );
  }
}

export const SettingsComponent = withLoad(formHoc(Settings));
