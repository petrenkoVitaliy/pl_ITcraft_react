import { withFormik } from 'formik';
import { Logger /*Validator*/ } from 'helpers';
import { ApiWrapper } from '../../../api';

const moduleName = 'SETTINGS_FORM_HOC';

const formHoc = withFormik({
  enableReinitialize: true,

  mapPropsToValues: props => {
    return {
      userKey: props.settingsData['user-key'],
      managerKey: props.settingsData['manager-key'],
      appKey: props.settingsData['app-key'],
      projectsMap: props.settingsData.projectsList || []
    };
  },

  // validate: values => Validator.required(values, ["userKey"]),

  handleSubmit: async (values, { setSubmitting }) => {
    Logger.log(moduleName, `submitted data  ${JSON.stringify(values)}`);

    ApiWrapper.plRequestsApi.setUserData(values);
    ApiWrapper.chromeApi.setData('settingsData', values);

    alert('Saved!');
    setSubmitting(false);
  }
});

export default formHoc;
