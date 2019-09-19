class LoggerClass {
  logs = []; // list of strings

  log = (receiver, msg) => {
    const logItem = `${receiver}: ${msg}`;
    this.logs.push(logItem);
  };

  getLogs = (lastLinesCount = this.logs.length) => {
    const length = this.logs.length;
    return this.logs.slice(length - lastLinesCount, length);
  };
}

export const Logger = new LoggerClass();
