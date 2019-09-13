import { Logger } from "helpers";

const moduleName = "PL_API";

export class PlRequestsApiClass {
  constructor({ userKey, managerKey } = {}) {
    this.requestData = {
      "user-key": userKey,
      "manager-key": managerKey,
      "app-key": "bc171976c01f30e8ce8bbe9cb0333942:jbjBAsLK3hkGwQE7QQ^Z",
      "project-id": "",
      "per-page": -1 // full data on one page,
      // 'parent-id': 205696
    };

    this.projectsList = [
      { name: "pr1", id: 123, code: "FLEX" },
      { name: "pr2", id: 23, code: "APEX" }
    ];
    this.tasksList = "";
    this.sprintIds = "";
    this.basicUrl = "https://pl.itcraft.co/api/client-v1";
  }

  setUserData = (data = {}) => {
    this.requestData = {
      ...this.requestData,
      "user-key": data.userKey,
      "manager-key": data.managerKey
    };

    this.projectsList = data.projectsMap ? data.projectsMap : this.projectsList;
  };

  getUserData = () => ({
    ...this.requestData,
    projectsList: this.projectsList
  });

  getTaskDetails = async taskNumber => {
    const projectId = this.__getProjectIdFromNumber(taskNumber);
    const details = await this.__getTaskDetails(taskNumber, projectId);
    return details;
  };

  getTaskDetailsFromAllSprints = async (taskNumber = "") => {
    this.sprintIds = await this.__getSprintsIdsList();
    this.tasksList = await this.__getTasksList(this.sprintIds);
    const task = this.tasksList.find(item => item.title.includes(taskNumber));

    Logger.log(
      moduleName,
      `found task from all sprints:  ${task ? task.id : "none"}`
    );
    return task;
  };

  getTaskFromAllProject = async (taskNumber = "") => {};

  getSprints = async () => {
    this.sprintIds = await this.__getSprints();

    return this.sprintIds;
  };

  createTask = async ({ description, time, title, sprint }) => {
    const task = await this.__createTask(description, time, title, sprint);

    return task;
  };

  uploadAllProjects = async () => {
    this.projectsList = await this.__uploadProjectsList();

    return this.projectsList;
  };

  //--> requests:

  __getSprints = async () => {
    const data = { ...this.requestData, query: "Sprint" };

    const res = await fetch(`${this.basicUrl}/tasks/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json());

    const sprintIds = this.__parseTaskDetails(res);

    Logger.log(moduleName, `found sprints:  ${sprintIds.length}`);
    return sprintIds;
  };

  __createTask = async (description, time, title, sprint) => {
    const projectId = this.__getProjectIdFromNumber(title);

    const data = {
      ...this.requestData,
      description: description,
      effort: time,
      title: title,
      "parent-id": sprint,
      "project-id": projectId
    };

    const res = await fetch(`${this.basicUrl}/tasks/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json());

    const task = this.__parseTaskDetails(res)[0];

    Logger.log(moduleName, `created task:  ${task}`);
    return task;
  };

  __uploadProjectsList = async () => {
    const data = {
      ...this.requestData
    };

    const res = await fetch(`${this.basicUrl}/projects/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json());

    return res;
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
      const parsedList = this.__parseTaskDetails(res);

      Logger.log(moduleName, `gotten tasks list:  ${parsedList.length}`);
      return parsedList;
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

    Logger.log(moduleName, `gotten sprint ids:  ${sprintIds.length}`);
    return sprintIds;
  };

  __parseTaskDetails = data => {
    if (!data || !data.tasks || !data.tasks.data) {
      return [];
    }
    return data.tasks.data;
  };

  __getTaskDetails = async (taskNumber, projectId) => {
    const data = {
      ...this.requestData,
      query: taskNumber,
      "project-id": projectId
    };

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

  __getProjectIdFromNumber = async taskNumber => {
    const currentProject =
      this.projectsList.find(({ code }) => taskNumber.includes(code)) || {};

    return currentProject.id;
  };
}
