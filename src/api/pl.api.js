import { Logger } from "helpers";

const moduleName = "PL_API";

export class PlRequestsApiClass {
  constructor({ userKey, managerKey, projectId, appKey }) {
    this.requestData = {
      "user-key": userKey,
      "manager-key": managerKey,
      "app-key": appKey,
      "project-id": projectId,
      "per-page": -1 // full data on one page,
      // 'parent-id': 205696
    };

    this.sprints = [];
    this.tasksList = "";
    this.sprintIds = "";
    this.basicUrl = "https://pl.itcraft.co/api/client-v1";
  }

  setUserData = data => {
    this.requestData = {
      ...this.requestData,
      "user-key": data.userKey,
      "manager-key": data.managerKey
    };
  };

  getTaskDetailsFromAllSprints = async (taskNumber = "") => {
    this.sprintIds = await this.__getSprintsIdsList();
    this.tasksList = await this.__getTasksList(this.sprintIds);
    const task = this.tasksList.find(item => item.title.includes(taskNumber));

    Logger.log(
      moduleName,
      `found task from all sprints:  ${JSON.stringify(task)}`
    );
    return task;
  };

  getSprints = async () => {
    const data = { ...this.requestData, query: "Sprint" };

    const res = await fetch(`${this.basicUrl}/tasks/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json());

    this.sprintIds = this.__parseTaskDetails(res);

    Logger.log(moduleName, `found sprints:  ${JSON.stringify(this.sprintIds)}`);
    return this.sprintIds;
  };

  createTask = async ({ description, time, title, sprint }) => {
    const data = {
      ...this.requestData,
      description: description,
      effort: time,
      title: title,
      "parent-id": sprint
    };

    const res = await fetch(`${this.basicUrl}/tasks/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json());

    const task = this.__parseTaskDetails(res)[0];

    Logger.log(moduleName, `created task:  ${JSON.stringify(task)}`);
    return task;
  };

  __getTasksList = async sprintsIdsList => {
    const data = { ...this.requestData };

    const queries = sprintsIdsList.map(async item => {
      data["parent-id"] = item; // to find task inside this sprint

      const res = await fetch(`${this.basicUrl}/tasks/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(response => response.json());

      Logger.log(moduleName, `gotten tasks list:  ${JSON.stringify(res)}`);
      return this.__parseTaskDetails(res);
    });

    const tasks = [];
    await Promise.all(queries).then(values => {
      values.forEach(item => tasks.push(...item));
    });

    return tasks;
  };

  __getSprintsIdsList = async () => {
    const sprints = await this.getSprints();
    const sprintIds = sprints.map(item => item.id);

    Logger.log(moduleName, `gotten sprint ids:  ${JSON.stringify(sprintIds)}`);
    return sprintIds;
  };

  __parseTaskDetails = data => {
    if (!data || !data.tasks || !data.tasks.data) {
      return [];
    }
    return data.tasks.data;
  };

  // unused method
  // gets task details by query
  __getTaskDetails = async taskNumber => {
    const data = { ...this.requestData, query: taskNumber };

    const res = await fetch(`${this.basicUrl}/tasks/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const task = this.__parseTaskDetails(res)[0];
    return task;
  };
}
