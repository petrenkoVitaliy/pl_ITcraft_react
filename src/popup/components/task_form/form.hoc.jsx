import { withFormik } from 'formik';

const formHoc = withFormik({
  mapPropsToValues: ({ loadedData: { title, sprintsList } }) => ({
    title: title || '',
    description: title || '',
    time: 666,
    sprint: sprintsList[sprintsList.length - 1].id
  }),

  validate: values => {
    const errors = {};

    if (!values.title) {
      errors.title = 'Required';
    }

    if (!values.description) {
      errors.description = 'Required';
    }

    if (!values.time) {
      errors.time = 'Required';
    }
    return errors;
  },

  handleSubmit: async (values, { setSubmitting, props }) => {
    await props.plRequestsApi.createTask(values);
    console.log(`TaskForm: submitted data:  ${JSON.stringify(values)}`);

    setSubmitting(false);
  },

  displayName: 'BasicForm'
});

export default formHoc;
