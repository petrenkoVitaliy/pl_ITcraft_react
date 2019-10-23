import React from "react";
import { Logger } from "helpers";

import { ApiWrapper } from "../../../api";

const moduleName = "CREATE-TASK_LOAD_HOC";

const withLoad = Component => {
  return class extends React.Component {
    state = {
      title: "",
      sprintsList: [],
      lastSprintId: "",
      projects: [],
      projectId: "",
      isTaskAlreadyCreated: false
    };

    async componentDidMount() {
      await this.loadData();
    }

    loadData = async (chosenProjectId = "") => {
      const title = await ApiWrapper.jiraApi.getTaskTitle();
      const taskNumber = await ApiWrapper.jiraApi.getTaskNumber();
      const projects = ApiWrapper.plRequestsApi.getProjectsByTitle(
        taskNumber
      ) || [{}];

      const projectId = chosenProjectId || projects[0].id || "";

      const sprintsList = await ApiWrapper.plRequestsApi.getSprints(projectId);
      const lastSprint = sprintsList[sprintsList.length - 1];
      const lastSprintId = lastSprint ? lastSprint.id : "";

      const createdTaskData = await ApiWrapper.plRequestsApi.getTaskDetails(
        taskNumber,
        projectId
      );
      const isTaskAlreadyCreated = createdTaskData && createdTaskData.id;

      this.setState(
        {
          title: `${taskNumber} ${title || ""}`,
          projects,
          projectId,
          isTaskAlreadyCreated,
          sprintsList,
          lastSprintId
        },
        () =>
          Logger.log(moduleName, `loaded data  ${JSON.stringify(this.state)}`)
      );
    };

    render() {
      return (
        <Component
          {...this.props}
          loadedData={this.state}
          updateSprintList={this.loadData}
        />
      );
    }
  };
};

export default withLoad;
