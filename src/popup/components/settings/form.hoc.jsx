import { withFormik } from "formik";

import { Logger } from "helpers";

import { ApiWrapper } from "../../../api";

const moduleName = "SETTINGS_FORM_HOC";

const formHoc = withFormik({
  mapPropsToValues: props => props.loadedData,

  validate: values => {
    const errors = {};

    if (!values.userKey) {
      errors.userKey = "Required";
    }

    if (!values.managerKey) {
      errors.managerKey = "Required";
    }

    if (!values.projectId) {
      errors.projectId = "Required";
    }

    if (!values.appKey) {
      errors.appKey = "Required";
    }
    return errors;
  },

  handleSubmit: async (values, { setSubmitting }) => {
    Logger.log(moduleName, `submitted data  ${JSON.stringify(values)}`);

    ApiWrapper.plRequestsApi.setUserData(values);
    ApiWrapper.chromeApi.setData("settingsData", values);

    setSubmitting(false);
  }
});

export default formHoc;
