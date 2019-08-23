import React from "react";

import { LoaderComponent } from "../loader";

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
    selectedTab: "details"
  };

  renderTab = () => {
    return;
  };

  handleTabClick = tabKey => () => {
    this.setState({ selectedTab: tabKey });
  };

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
          {this.tabsList[selectedTab] || <LoaderComponent />}
        </div>
      </div>
    );
  }
}
