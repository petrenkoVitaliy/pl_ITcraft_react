import { withFormik } from 'formik';

import { Logger, Validator } from 'helpers';

import { ApiWrapper } from '../../../api';

const moduleName = 'SETTINGS_FORM_HOC';

const formHoc = withFormik({
  enableReinitialize: true,

  mapPropsToValues: props => ({
    userKey: props.loadedData['user-key'],
    managerKey: props.loadedData['manager-key'],
    appKey: props.loadedData['app-key']
  }),

  validate: values => Validator.required(values, ['appKey']),

  handleSubmit: async (values, { setSubmitting }) => {
    Logger.log(moduleName, `submitted data  ${JSON.stringify(values)}`);

    ApiWrapper.plRequestsApi.setUserData(values);
    ApiWrapper.chromeApi.setData('settingsData', values);

    alert('Saved!');
    setSubmitting(false);
  }
});

export default formHoc;
