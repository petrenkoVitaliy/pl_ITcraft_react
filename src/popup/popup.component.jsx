import React from "react";
import Button from "@material-ui/core/Button";

import { ApiWrapper } from "../api";

import "./index.css";

import { SettingsComponent } from "./components/settings";
import { TaskDetailsComponent } from "./components/task_details";
import { TaskFormComponent } from "./components/task_form";

export class PopupComponent extends React.Component {
  tabsList = {
    details: <TaskDetailsComponent />,
    create: <TaskFormComponent />,
    settings: <SettingsComponent />
  };

  state = {
    selectedTab: ""
  };

  async componentDidMount() {
    ApiWrapper.initializeApi();

    const savedUserData = await ApiWrapper.chromeApi.getData("settingsData");
    ApiWrapper.plRequestsApi.setUserData(savedUserData.settingsData);
    await ApiWrapper.plRequestsApi.uploadAllProjects();

    this.setState({ selectedTab: "details" });
  }

  handleTabClick = tabKey => () =>
    this.state.selectedTab !== tabKey && this.setState({ selectedTab: tabKey });

  render() {
    const { selectedTab } = this.state;

    return (
      <div>
        <div className="menuWrapper">
          {Object.keys(this.tabsList).map(item => (
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleTabClick(item)}
              key={item}
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="tab_wrapper">
          {this.tabsList[selectedTab] ||
            `something has been broken, the world in a danger, 
          run away...`}
        </div>
      </div>
    );
  }
}
