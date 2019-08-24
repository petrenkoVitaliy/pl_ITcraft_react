import { PlRequestsApiClass } from "./pl.api";
import { ChromeApiClass } from "./chrome.api";
import { JiraApiClass } from "./jira.api";

class ApiWrapperClass {
  constructor() {
    this.plRequestsApi = "";
    this.chromeApi = "";
    this.jiraApi = "";
  }
  initializeApi = ({ userData }) => {
    this.plRequestsApi = new PlRequestsApiClass(userData);
    this.chromeApi = new ChromeApiClass();
    this.jiraApi = new JiraApiClass();
  };
}

export const ApiWrapper = new ApiWrapperClass();
