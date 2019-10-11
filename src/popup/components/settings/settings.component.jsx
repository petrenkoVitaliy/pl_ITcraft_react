import React from 'react';
import { Form } from 'formik';

import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';

import formHoc from './settings-form.hoc';
import withLoad from './settings-load.hoc';

const styles = {
  button: {
    width: '180px',
    height: '35px',
    borderRadius: '25px',
    boxShadow: 'none',
    margin: '20px 15px'
  },
  submitBtnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  field: {
    borderRadius: '6px',
    marginBottom: '20px',
    height: 30
  },
  fieldsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  settingsWrapper: {
    maxHeight: '400px',
    overflow: 'auto',
    overflowX: 'hidden'
  }
};

class Settings extends React.Component {
  getFieldProps = ({ fieldName, placeHolder, disabled = false, value }) => ({
    variant: 'outlined',
    value: value,
    name: fieldName,
    id: fieldName,
    disabled: disabled,
    error: !!this.props.errors[fieldName] && this.props.touched[fieldName],
    onChange: this.props.handleChange,
    helperText: this.props.touched[fieldName]
      ? this.props.errors[fieldName]
      : ''
  });

  renderField = field => {
    const { classes } = this.props;
    const isPaired = Array.isArray(field);
    const fieldsPair = isPaired ? field : [field];

    return (
      <Box className={classes.fieldsWrapper}>
        {fieldsPair.map(fieldData => (
          <Box
            key={fieldData.fieldName}
            style={{ width: isPaired ? '45%' : '100%' }}
          >
            <InputLabel shrink>{fieldData.placeHolder}</InputLabel>
            <TextField
              {...this.getFieldProps(fieldData)}
              InputProps={{
                className: classes.field
              }}
              style={{ width: '100%' }}
            />
          </Box>
        ))}
      </Box>
    );
  };

  render() {
    const { values, classes } = this.props;

    const fieldsList = [
      {
        fieldName: 'userKey',
        placeHolder: 'User Key',
        value: values.userKey
      },
      {
        fieldName: 'managerKey',
        placeHolder: 'Manager Key',
        value: values.managerKey
      },
      {
        fieldName: 'appKey',
        placeHolder: 'App Key',
        disabled: true,
        value: values.appKey
      },
      ...this.props.values.projectsMap.map((item, index) => [
        {
          fieldName: `projectsMap.${index}.name`,
          disabled: true,
          value: values.projectsMap[index].name,
          placeHolder: 'Project Name'
        },
        {
          placeHolder: 'Project Key',
          fieldName: `projectsMap.${index}.code`,
          value: values.projectsMap[index].code
        }
      ])
    ];

    return (
      <Form>
        <Box className={classes.settingsWrapper}>
          {fieldsList.map(this.renderField)}
        </Box>
        <Box className={classes.submitBtnWrapper}>
          <Button
            variant='outlined'
            color='primary'
            className={classes.button}
            onClick={() => this.props.changeActiveTab(0)}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            type='submit'
          >
            Save
          </Button>
        </Box>
      </Form>
    );
  }
}

export const SettingsComponent = withStyles(styles)(
  withLoad(formHoc(Settings))
);
