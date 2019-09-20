import React from 'react';

import { ApiWrapper } from '../../../api';

const withLoad = Component => {
  return class extends React.Component {
    state = {
      taskNumber: '',
      taskData: [],
      projectsList: [],
      projectId: ''
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

      const formattedTaskData = taskData.map(task => ({
        ...task,
        'time-taken': `${(task['time-taken'] / 60).toFixed(1)} hours`,
        'time-approved': `${(task['time-approved'] / 60).toFixed(1)} hours`,
        'time-effort': `${(task['time-effort'] / 60).toFixed(1)} hours`
      }));
      const firstTask = taskData[0];
      this.setState({
        taskData: formattedTaskData,
        projectsList,
        projectId: projectId || (firstTask && firstTask['project-id'])
      });
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
