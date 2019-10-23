import React from "react";
import { Logger } from "helpers";

import { ApiWrapper } from "../../../api";

const moduleName = "TASK-DETAILS_LOAD_HOC";

const withLoad = Component => {
  return class extends React.Component {
    state = {
      taskNumber: "",
      taskData: {},
      projectsList: [],
      projectId: ""
    };

    async componentDidMount() {
      await this.uploadPage();
    }

    uploadPage = async projectId => {
      const taskNumber = await this.getTaskNumber();
      await this.uploadTaskData(taskNumber, projectId);
    };

    uploadTaskData = async (taskNumber, projectId) => {
      const taskData = await ApiWrapper.plRequestsApi.getTaskDetails(
        taskNumber,
        projectId
      );
      const projectsList = ApiWrapper.plRequestsApi.getProjectsByTitle(
        taskNumber
      );

      const formattedTaskData = {
        ...taskData,
        "time-taken": `${(taskData["time-taken"] / 60).toFixed(1)} hours`,
        "time-approved": `${(taskData["time-approved"] / 60).toFixed(1)} hours`,
        "time-effort": `${(taskData["time-effort"] / 60).toFixed(1)} hours`
      };

      this.setState(
        {
          taskData: formattedTaskData,
          projectsList,
          projectId: taskData["project-id"]
        },
        () =>
          Logger.log(moduleName, `loaded data  ${JSON.stringify(this.state)}`)
      );
    };

    getTaskNumber = async () => {
      const taskNumber = await ApiWrapper.jiraApi.getTaskNumber();

      this.setState({ taskNumber });
      return taskNumber;
    };

    changeProjectId = async projectId => {
      await this.uploadPage(projectId);
    };

    render() {
      const { taskNumber, taskData, projectsList, projectId } = this.state;

      return (
        <Component
          {...this.props}
          taskNumber={taskNumber}
          taskData={taskData}
          projectId={projectId}
          projectsList={projectsList}
          uploadPage={this.uploadPage}
          changeProjectId={this.changeProjectId}
        />
      );
    }
  };
};

export default withLoad;
