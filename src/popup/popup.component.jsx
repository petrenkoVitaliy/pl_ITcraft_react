import React from "react";

import { ApiWrapper } from "../api";

import { SettingsComponent } from "./components/settings";
import { TaskDetailsComponent } from "./components/task_details";
import { TaskFormComponent } from "./components/task_form";

import "./index.css";

export class PopupComponent extends React.Component {
  tabsList = {
    details: <TaskDetailsComponent />,
    form: <TaskFormComponent />,
    settings: <SettingsComponent />
  };

  state = {
    selectedTab: ""
  };

  async componentDidMount() {
    const userData = {
      userKey: "2622:6dX8Z3$_230M5B%aF0zM",
      managerKey: "2622:Mp4Mz*tzUq@*W4_4Q_3Q",
      projectId: "2097", //flex
      appKey: "bc171976c01f30e8ce8bbe9cb0333942:jbjBAsLK3hkGwQE7QQ^Z" // const
    };

    ApiWrapper.initializeApi({ userData });
    this.setState({ selectedTab: "details" });
    await ApiWrapper.chromeApi.setData("settingsData", userData);
  }

  handleTabClick = tabKey => () =>
    this.state.selectedTab !== tabKey && this.setState({ selectedTab: tabKey });

  render() {
    const { selectedTab } = this.state;

    return (
      <div>
        <div className="tabs">
          {Object.keys(this.tabsList).map(item => (
            <button onClick={this.handleTabClick(item)} key={item}>
              {item}
            </button>
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
