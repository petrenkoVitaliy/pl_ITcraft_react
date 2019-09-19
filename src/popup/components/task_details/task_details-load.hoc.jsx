import React from 'react';

import { ApiWrapper } from '../../../api';

const withLoad = Component => {
  return class extends React.Component {
    state = {
      taskNumber: '',
      taskData: []
    };

    async componentDidMount() {
      await this.uploadPage();
    }

    uploadPage = async () => {
      const taskNumber = await this.getTaskNumber();
      await this.uploadTaskData(taskNumber);
    };

    uploadTaskData = async taskNumber => {
      const taskData = await ApiWrapper.plRequestsApi.getTaskDetails(
        taskNumber
      );

      const formattedTaskData = taskData.map(task => ({
        ...task,
        'time-taken': `${(task['time-taken'] / 60).toFixed(1)} hours`,
        'time-approved': `${(task['time-approved'] / 60).toFixed(1)} hours`,
        'time-effort': `${(task['time-effort'] / 60).toFixed(1)} hours`
      }));
      this.setState({ taskData: formattedTaskData });
    };

    getTaskNumber = async () => {
      const taskNumber = await ApiWrapper.jiraApi.getTaskNumber();

      this.setState({ taskNumber });
      return taskNumber;
    };

    render() {
      const { taskNumber, taskData } = this.state;

      return (
        <Component
          {...this.props}
          taskNumber={taskNumber}
          taskData={taskData}
          uploadPage={this.uploadPage}
        />
      );
    }
  };
};

export default withLoad;
