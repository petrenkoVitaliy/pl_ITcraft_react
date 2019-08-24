/*global chrome*/

class JiraApiClass {
  getTaskNumber = () => {
    return new Promise((resolve, reject) => {
      if (!chrome.tabs) {
        resolve(false);
      }
      chrome.tabs.query(
        { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
        tabs => {
          const tabUrl = tabs[0].url;
          const post = tabUrl.indexOf('browse/');
          const taskNumber = tabUrl.slice(post + 7, post + 16);
          console.log(`JIRA API: founded task number: ${taskNumber}`);
          resolve(taskNumber);
        }
      );
    });
  };

  getTaskTitle = () => {
    return new Promise((resolve, reject) => {
      if (!chrome.tabs) {
        resolve(false);
      }
      chrome.tabs.executeScript(
        {
          code: `document.querySelector("*[data-test-id='issue.views.issue-base.foundation.summary.heading']").innerText`
        },
        result => {
          console.log(`JIRA API: founded element: ${result}`);
          resolve(result);
        }
      );
    });
  };
}

export const JiraApi = new JiraApiClass();
