/*global chrome*/
import { Logger } from "helpers";

const moduleName = "CHROME_API";

export class ChromeApiClass {
  setData = (key, value) => {
    return new Promise((resolve, reject) => {
      if (!chrome.storage) {
        Logger.log(moduleName, `cant find chrome.storage`);
        resolve(false);
      }
      chrome.storage.local.set({ [key]: value }, function() {
        Logger.log(
          moduleName,
          `value is set to ${key}: ${JSON.stringify(value)}`
        );
        resolve(value);
      });
    });
  };

  getData = key => {
    return new Promise((resolve, reject) => {
      if (!chrome.storage) {
        Logger.log(moduleName, `cant find chrome.storage`);
        resolve(false);
      }
      chrome.storage.local.get([key], result => {
        Logger.log(
          moduleName,
          `value gotten ${key}: ${JSON.stringify(result)}`
        );

        resolve(result);
      });
    });
  };
}
