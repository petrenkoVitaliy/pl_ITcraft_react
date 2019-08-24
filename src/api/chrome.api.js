/*global chrome*/

class ChromeApiClass {
  setData = (key, value) => {
    return new Promise((resolve, reject) => {
      if (!chrome.storage) {
        resolve(false);
      }
      chrome.storage.local.set({ [key]: value }, function() {
        console.log(
          `CHROME API: value is set to ${key}: ${JSON.stringify(value)}`
        );
        resolve(value);
      });
      resolve(true);
    });
  };

  getData = key => {
    return new Promise((resolve, reject) => {
      if (!chrome.storage) {
        resolve(false);
      }
      chrome.storage.local.get([key], result => {
        console.log(
          `CHROME API: value gotten ${key}: ${JSON.stringify(result)}`
        );
        resolve(result);
      });
    });
  };
}

export const ChromeApi = new ChromeApiClass();
