import React from 'react';
import { ApiWrapper } from '../../../api';

const withLoad = Component => {
  return class extends React.Component {
    state = { settingsData: {} };

    async componentDidMount() {
      const settingsData = await ApiWrapper.plRequestsApi.getUserData();
      settingsData && this.setState({ settingsData });
      console.log(settingsData.projectsList);
    }

    render() {
      return (
        <Component {...this.props} settingsData={this.state.settingsData} />
      );
    }
  };
};

export default withLoad;
