import { withFormik } from 'formik';

import { Logger, Validator } from 'helpers';

import { ApiWrapper } from '../../../api';

const moduleName = 'SETTINGS_FORM_HOC';

const formHoc = withFormik({
  enableReinitialize: true,

  mapPropsToValues: props => ({
    userKey: props.loadedData['user-key'],
    managerKey: props.loadedData['manager-key'],
    projectId: props.loadedData['project-id'],
    appKey: props.loadedData['user-key']
  }),

  validate: values =>
    Validator.required(values, [
      'userKey',
      'managerKey',
      'projectId',
      'appKey'
    ]),

  handleSubmit: async (values, { setSubmitting }) => {
    Logger.log(moduleName, `submitted data  ${JSON.stringify(values)}`);

    ApiWrapper.plRequestsApi.setUserData(values);
    ApiWrapper.chromeApi.setData('settingsData', values);

    setSubmitting(false);
  }
});

export default formHoc;
