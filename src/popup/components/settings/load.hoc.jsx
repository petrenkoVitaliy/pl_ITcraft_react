import React from "react";

import { ApiWrapper } from "../../../api";

const withLoad = Component => {
  return class extends React.Component {
    state = { loadedData: "" };

    async componentDidMount() {
      const result = await ApiWrapper.chromeApi.getData("settingsData");

      result.settingsData && this.setState({ loadedData: result.settingsData });
    }

    render() {
      return this.state.loadedData ? (
        <Component {...this.props} loadedData={this.state.loadedData} />
      ) : (
        ""
      );
    }
  };
};

export default withLoad;
