import React from 'react';
import classnames from 'classnames';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';

import { ApiWrapper } from '../api';
import { SettingsComponent } from './components/settings';
import { TaskDetailsComponent } from './components/task_details';
import { TaskFormComponent } from './components/task_form';

const styles = {
  button: {
    height: '40px',
    borderRadius: '10px 10px 0 0',
    fontFamily: 'Helvetica',
    color: '#ffffff',
    boxShadow: 'none',
    border: 'none',
    fontSize: '18px'
  },
  wideButton: {
    width: '250px'
  },
  smallButton: {
    maxWidth: '50px',
    minWidth: '50px'
  },
  icon: {
    width: '25px'
  },
  menuWrapper: {
    width: '100%'
  },
  bottomLine: {
    width: '100%',
    backgroundColor: '#20274e',
    height: '7px'
  },
  popupWrapper: {
    width: '550px',
    margin: 0,
    padding: 0
  },
  tabWrapper: {
    padding: '40px 20px',
    height: '500px'
  },
  '@global': {
    '*::-webkit-scrollbar': {
      '-webkit-appearance': 'none'
    },
    '*::-webkit-scrollbar:vertical': {
      width: '11px'
    },
    '*::-webkit-scrollbar-thumb': {
      borderRadius: '8px',
      border: '2px solid white',
      backgroundColor: '#525ea1'
    }
  }
};

class PopupComponent extends React.Component {
  tabsList = {
    postTime: {
      component: <TaskDetailsComponent />,
      key: 'post time'
    },
    newTask: {
      component: <TaskFormComponent />,
      key: 'new task'
    },
    settings: {
      component: <SettingsComponent />,
      key: 'settings'
    }
  };

  state = {
    selectedTab: ''
  };

  async componentDidMount() {
    ApiWrapper.initializeApi();

    const savedUserData = await ApiWrapper.chromeApi.getData('settingsData');

    ApiWrapper.plRequestsApi.setUserData(savedUserData.settingsData);
    await ApiWrapper.plRequestsApi.uploadAllProjects();

    this.setState({ selectedTab: this.tabsList.postTime.key });
  }

  handleTabClick = tabKey => () =>
    this.state.selectedTab !== tabKey && this.setState({ selectedTab: tabKey });

  render() {
    const { selectedTab } = this.state;
    const { classes } = this.props;
    const selectedComponent = Object.values(this.tabsList).find(
      ({ key }) => key === selectedTab
    );

    return (
      <Box className={classes.popupWrapper}>
        <Box className={classes.menuWrapper}>
          <Button
            className={classnames(classes.wideButton, classes.button)}
            variant='contained'
            color='primary'
            onClick={this.handleTabClick(this.tabsList.postTime.key)}
          >
            {this.tabsList.postTime.key}
          </Button>
          <Button
            className={classnames(classes.wideButton, classes.button)}
            variant='contained'
            color='primary'
            onClick={this.handleTabClick(this.tabsList.newTask.key)}
          >
            {this.tabsList.newTask.key}
          </Button>
          <Button
            className={classnames(classes.smallButton, classes.button)}
            variant='contained'
            color='secondary'
            onClick={this.handleTabClick(this.tabsList.settings.key)}
          >
            <img
              className={classes.icon}
              src='/img/settings.svg'
              alt='settings menu'
            />
          </Button>
          <Box className={classes.bottomLine} />
        </Box>
        <Box className={classes.tabWrapper}>
          {selectedComponent
            ? selectedComponent.component
            : `something has been broken, the world in a danger, 
          run away...`}
        </Box>
      </Box>
    );
  }
}
PopupComponent = withStyles(styles)(PopupComponent);
export { PopupComponent };
