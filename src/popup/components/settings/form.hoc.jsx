import { withFormik } from 'formik';
import { ChromeApi } from '../../../api';

const formHoc = withFormik({
  mapPropsToValues: props => props.loadedData,

  validate: values => {
    const errors = {};

    if (!values.userKey) {
      errors.userKey = 'Required';
    }

    if (!values.managerKey) {
      errors.managerKey = 'Required';
    }

    if (!values.projectId) {
      errors.projectId = 'Required';
    }

    if (!values.appKey) {
      errors.appKey = 'Required';
    }
    return errors;
  },

  handleSubmit: async (values, { setSubmitting }) => {
    console.log(`SettingsForm: submitted data:  ${JSON.stringify(values)}`);
    await ChromeApi.setData('settingsData', values);

    setSubmitting(false);
  },

  displayName: 'BasicForm'
});

export default formHoc;
