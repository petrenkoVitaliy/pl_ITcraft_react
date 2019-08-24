import React from 'react';
import { ChromeApi } from '../../../api';

const withLoad = Component => {
  return class extends React.Component {
    state = { loadedData: '' };

    async componentDidMount() {
      const result = await ChromeApi.getData('settingsData');

      result.settingsData && this.setState({ loadedData: result.settingsData });

      if (!result) {
        this.setState({
          loadedData: {
            userKey: '1', //todo
            managerKey: '2622:Mp4Mz*tzUq@*W4_4Q_3Q', //todo
            projectId: '2097', //flex
            appKey: 'bc171976c01f30e8ce8bbe9cb0333942:jbjBAsLK3hkGwQE7QQ^Z'
          }
        });
      }
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
