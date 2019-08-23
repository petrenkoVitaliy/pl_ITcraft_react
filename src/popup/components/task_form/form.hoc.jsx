import { withFormik } from "formik";

const formHoc = withFormik({
  mapPropsToValues: () => ({
    title: "",
    description: "",
    time: "",
    sprint: ""
  }),

  // Custom sync validation
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

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  displayName: "BasicForm"
});

export default formHoc;
