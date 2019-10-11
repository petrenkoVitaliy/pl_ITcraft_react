import React from 'react';

import { withStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { ApiWrapper } from '../api';
import { SettingsComponent } from './components/settings';
import { TaskDetailsComponent } from './components/task_details';
import { TaskFormComponent } from './components/task_form';

const styles = {
  tab: {
    color: 'white',
    borderRadius: '10px 10px 0 0',
    backgroundColor: '#20274e',
    opacity: 1
  },
  smallTab: {
    maxWidth: '50px'
  },
  tabsHeader: {
    boxShadow: 'none'
  },
  activeTab: {
    backgroundColor: '#525ea1',
    borderRadius: '10px 10px 0 0',
    opacity: 1
  },
  tabs: { backgroundColor: 'white' },
  indicator: { backgroundColor: '#20274e', height: '5px' },
  icon: {
    width: '25px'
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
      component: TaskDetailsComponent,
      key: 0
    },
    newTask: {
      component: TaskFormComponent,
      key: 1
    },
    settings: {
      component: SettingsComponent,
      key: 2
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

  handleTabClick = (e, tabKey) => this.changeActiveTab(tabKey);

  changeActiveTab = tabKey =>
    this.state.selectedTab !== tabKey && this.setState({ selectedTab: tabKey });

  getTabsProps = (index, additionalClass) => ({
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
    className: `${additionalClass}
      ${
        this.state.selectedTab === index
          ? this.props.classes.activeTab
          : this.props.classes.tab
      }`,
    classes: { root: this.props.classes.tab }
  });

  render() {
    const { selectedTab } = this.state;
    const { classes } = this.props;
    const selectedComponent = Object.values(this.tabsList).find(
      ({ key }) => key === selectedTab
    );

    return (
      <Box className={classes.popupWrapper}>
        <AppBar position='static' className={classes.tabsHeader}>
          <Tabs
            value={selectedTab}
            onChange={this.handleTabClick}
            variant='fullWidth'
            className={classes.tabs}
            indicatorColor='primary'
            classes={{
              indicator: classes.indicator
            }}
          >
            <Tab
              label='post time'
              {...this.getTabsProps(this.tabsList.postTime.key)}
            />
            <Tab
              label='new task'
              {...this.getTabsProps(this.tabsList.newTask.key)}
            />
            <Tab
              icon={
                <img
                  className={classes.icon}
                  src='/img/settings.svg'
                  alt='settings menu'
                />
              }
              {...this.getTabsProps(
                this.tabsList.settings.key,
                classes.smallTab
              )}
            />
          </Tabs>
        </AppBar>
        <Box className={classes.tabWrapper}>
          {selectedComponent ? (
            <selectedComponent.component
              changeActiveTab={this.changeActiveTab}
            />
          ) : (
            `something has been broken, the world in a danger, 
          run away...`
          )}
        </Box>
      </Box>
    );
  }
}
PopupComponent = withStyles(styles)(PopupComponent);
export { PopupComponent };
