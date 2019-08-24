import { withFormik } from "formik";

import { Logger } from "helpers";

const moduleName = "TASK_FORM_HOC";

const formHoc = withFormik({
  mapPropsToValues: ({ loadedData: { title, sprintsList } }) => ({
    title: title || "",
    description: title || "",
    time: 666, // it is necessary for api, but doesn't necessary for us, so... kek
    sprint: sprintsList[sprintsList.length - 1].id // take last sprint id
  }),

  validate: values => {
    const errors = {};

    if (!values.title) {
      errors.title = "Required";
    }

    if (!values.description) {
      errors.description = "Required";
    }

    if (!values.time) {
      errors.time = "Required";
    }
    return errors;
  },

  handleSubmit: async (values, { setSubmitting, props }) => {
    await props.plRequestsApi.createTask(values);
    Logger.log(moduleName, `submitted data:  ${JSON.stringify(values)}`);

    setSubmitting(false);
  }
});

export default formHoc;
