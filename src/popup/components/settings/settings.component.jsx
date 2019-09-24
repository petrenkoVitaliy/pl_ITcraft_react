import React from "react";
import { Form } from "formik";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import formHoc from "./settings-form.hoc";
import withLoad from "./settings-load.hoc";
import "./index.css";
export class Settings extends React.Component {
  renderField = (fieldName, placeHolder, disabled = false) => {
    const { errors, touched, handleChange } = this.props;

    return (
      <div key={fieldName} className="field_wrap">
        <TextField
          name={fieldName}
          id={fieldName}
          disabled={disabled}
          label={placeHolder}
          error={!!errors[fieldName] && touched[fieldName]}
          onChange={handleChange}
          helperText={touched[fieldName] ? errors[fieldName] : ""}
          fullWidth
        />
      </div>
    );
  };

  render() {
    const fieldsList = [
      {
        fieldName: "userKey",
        placeHolder: "userKey"
      },
      {
        fieldName: "managerKey",
        placeHolder: "managerKey"
      },
      {
        fieldName: "appKey",
        placeHolder: "appKey",
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
            placeHolder: "projectKey"
          }
        ])
        .flat(1)
    ];

    return (
      <Form>
        <div>
          <Typography variant="h5" gutterBottom>
            Settings form
          </Typography>
          {fieldsList.map(({ fieldName, placeHolder, disabled }) =>
            this.renderField(fieldName, placeHolder, disabled)
          )}
          <Button variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    );
  }
}

export const SettingsComponent = withLoad(formHoc(Settings));
