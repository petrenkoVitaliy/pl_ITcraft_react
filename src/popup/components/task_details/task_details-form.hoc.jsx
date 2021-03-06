import { withFormik } from "formik";
import moment from "moment";

import { Logger, Validator } from "helpers";
import { ApiWrapper } from "../../../api";

const moduleName = "TASK_DETAILS_FORM_HOC";

const formHoc = withFormik({
  enableReinitialize: true,

  mapPropsToValues: props => ({
    description: "",
    taken: "",
    date: moment(),
    taskId: props.taskData.id,
    projectId: props.projectId
  }),

  validate: values =>
    Validator.required(values, ["description", "taken", "date"]),

  handleSubmit: async (values, { props, setSubmitting }) => {
    Logger.log(moduleName, `submitted data  ${JSON.stringify(values)}`);
    const formattedValues = {
      ...values,
      taken: (values.taken * 60).toFixed(0),
      date: moment(values.date).format("YYYY-MM-DD")
    };
    ApiWrapper.plRequestsApi.postTime(formattedValues);

    alert("Posted!");
    setSubmitting(false);
    props.uploadPage();
  }
});

export default formHoc;
