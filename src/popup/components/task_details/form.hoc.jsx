import { withFormik } from 'formik';

import { Logger } from 'helpers';

import { ApiWrapper } from '../../../api';

const moduleName = 'SETTINGS_FORM_HOC';

const formHoc = withFormik({
  enableReinitialize: true,

  mapPropsToValues: props => ({
    projectsList: ''
  }),

  handleSubmit: async (values, { setSubmitting }) => {
    Logger.log(moduleName, `submitted data  ${JSON.stringify(values)}`);

    //ApiWrapper.plRequestsApi.setProjectsData(values);
    //ApiWrapper.chromeApi.setData('settingsData', values);

    alert('Saved!');
    setSubmitting(false);
  }
});

export default formHoc;
