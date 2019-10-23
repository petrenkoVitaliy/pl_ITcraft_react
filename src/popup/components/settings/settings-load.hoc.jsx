import React from "react";
import { Logger } from "helpers";

import { ApiWrapper } from "../../../api";

const moduleName = "SETTINGS_LOAD_HOC";

const withLoad = Component => {
  return class extends React.Component {
    state = { settingsData: {} };

    async componentDidMount() {
      const settingsData = await ApiWrapper.plRequestsApi.getUserData();
      settingsData && this.setState({ settingsData });
      Logger.log(moduleName, `loaded data  ${JSON.stringify(settingsData)}`);
    }

    render() {
      return (
        <Component {...this.props} settingsData={this.state.settingsData} />
      );
    }
  };
};

export default withLoad;
