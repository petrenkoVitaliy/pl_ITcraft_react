import { withFormik } from 'formik';

import { Logger, Validator } from 'helpers';
import { ApiWrapper } from '../../../api';

const moduleName = 'TASK_FORM_HOC';

const formHoc = withFormik({
  enableReinitialize: true,

  mapPropsToValues: ({ loadedData: { title, sprintsList } }) => {
    const lastSprint = sprintsList[sprintsList.length - 1];
    const lastSprintId = lastSprint ? lastSprint.id : '';

    return {
      title: title || '',
      description: title || '',
      time: 1, // it is necessary for api, but doesn't necessary for us
      sprint: lastSprintId // take last sprint id
    };
  },

  validate: values =>
    Validator.required(values, ['title', 'description', 'time', 'sprint']),

  handleSubmit: async (values, { setSubmitting, props }) => {
    await ApiWrapper.plRequestsApi.createTask(values);

    Logger.log(moduleName, `submitted data:  ${JSON.stringify(values)}`);
    alert('Created!');

    setSubmitting(false);
  }
});

export default formHoc;
