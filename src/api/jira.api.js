/*global chrome*/
import { Logger } from "helpers";

const moduleName = "JIRA_API";

export class JiraApiClass {
  getTaskNumber = () => {
    return new Promise((resolve, reject) => {
      if (!chrome.tabs) {
        Logger.log(moduleName, "cant find chrome.tabs");
        resolve(false);
      }
      chrome.tabs.query(
        { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
        tabs => {
          const tabUrl = tabs[0].url;
          const post = tabUrl.indexOf("browse/");
          const taskNumber = tabUrl.slice(post + 7);

          Logger.log(moduleName, `founded task number: ${taskNumber}`);
          resolve(taskNumber);
        }
      );
    });
  };

  getTaskTitle = () => {
    return new Promise((resolve, reject) => {
      if (!chrome.tabs) {
        Logger.log(moduleName, "cant find chrome.tabs");
        resolve(false);
      }
      chrome.tabs.executeScript(
        {
          code: `document.querySelector("*[data-test-id='issue.views.issue-base.foundation.summary.heading']").innerText`
        },
        result => {
          Logger.log(moduleName, `founded task title: ${result}`);
          resolve(result);
        }
      );
    });
  };
}
