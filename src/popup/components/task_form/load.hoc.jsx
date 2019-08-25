import React from 'react';

import { ApiWrapper } from '../../../api';

const withLoad = Component => {
  return class extends React.Component {
    state = { loadedData: '' };

    async componentDidMount() {
      const title = await ApiWrapper.jiraApi.getTaskTitle();
      const taskNumber = await ApiWrapper.jiraApi.getTaskNumber();
      const sprintsList = await ApiWrapper.plRequestsApi.getSprints();

      this.setState({
        loadedData: { title: `${taskNumber} ${title}`, sprintsList }
      });
    }

    render() {
      return this.state.loadedData ? (
        <Component {...this.props} loadedData={this.state.loadedData} />
      ) : (
        ''
      );
    }
  };
};

export default withLoad;
