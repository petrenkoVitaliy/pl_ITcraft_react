import React from 'react';
import { JiraApi, PlRequestsApi, ChromeApi } from '../../../api';

const withLoad = Component => {
  return class extends React.Component {
    state = { loadedData: '' };

    async componentDidMount() {
      const title = await JiraApi.getTaskTitle();
      const taskNumber = await JiraApi.getTaskNumber();
      const userData = await ChromeApi.getData('settingsData');

      this.plRequestsApi = new PlRequestsApi(userData.settingsData);
      const sprintsList = await this.plRequestsApi.getSprints();

      this.setState({
        loadedData: { title: `${taskNumber} ${title}`, sprintsList }
      });
    }

    render() {
      return this.state.loadedData ? (
        <Component
          {...this.props}
          loadedData={this.state.loadedData}
          plRequestsApi={this.plRequestsApi}
        />
      ) : (
        ''
      );
    }
  };
};

export default withLoad;
