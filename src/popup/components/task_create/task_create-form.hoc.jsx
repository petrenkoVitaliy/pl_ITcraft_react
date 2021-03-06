import { withFormik } from "formik";
import { Logger, Validator } from "helpers";
import { ApiWrapper } from "../../../api";

const moduleName = "TASK_CREATE_HOC";

const formHoc = withFormik({
  enableReinitialize: true,

  mapPropsToValues: ({ loadedData: { title, lastSprintId, projectId } }) => {
    return {
      project: projectId,
      title: title || "",
      description: title || "",
      time: 1, // it is necessary for api, but doesn't necessary for us 😃
      sprint: lastSprintId // take last sprint id
    };
  },

  validate: values =>
    Validator.required(values, [
      "project",
      "title",
      "description",
      "time",
      "sprint"
    ]),

  handleSubmit: async (values, { setSubmitting, props }) => {
    await ApiWrapper.plRequestsApi.createTask(values);

    Logger.log(moduleName, `submitted data:  ${JSON.stringify(values)}`);
    alert("Created!");

    setSubmitting(false);
    props.changeActiveTab(0);
  }
});

export default formHoc;
