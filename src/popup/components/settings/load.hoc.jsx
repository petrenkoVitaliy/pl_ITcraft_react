import React from 'react';

import { ApiWrapper } from '../../../api';

const withLoad = Component => {
  return class extends React.Component {
    state = { loadedData: '' };

    async componentDidMount() {
      const settingsData = await ApiWrapper.plRequestsApi.getUserData();
      console.log(settingsData);
      settingsData && this.setState({ loadedData: settingsData });
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
