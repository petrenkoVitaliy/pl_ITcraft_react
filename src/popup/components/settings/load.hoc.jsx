import React from 'react';

import { ApiWrapper } from '../../../api';

const withLoad = Component => {
  return class extends React.Component {
    state = {
      taskNumber: '',
      taskData: ''
    };

    async componentDidMount() {
      //const taskNumber = await this.getTaskNumber();
      // await this.uploadTaskData(taskNumber);
      await this.getTaskNumber();
    }

    uploadTaskData = async taskNumber => {
      const taskData = await ApiWrapper.plRequestsApi.getTaskDetailsFromAllSprints(
        taskNumber
      );
      this.setState({ taskData });
    };

    getTaskNumber = async () => {
      const taskNumber = await ApiWrapper.jiraApi.getTaskNumber();

      this.setState({ taskNumber });
      return taskNumber;
    };

    render() {
      return <Component {...this.props} loadedData={this.state.loadedData} />;
    }
  };
};

export default withLoad;
