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

    this.projectsList = [];
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

  getProjectsByTitle = (taskNumber = "") => {
    const projects =
      this.projectsList.filter(({ code }) => {
        const separatedCodes = code.split(" ").filter(Boolean);

        return separatedCodes.some(code => taskNumber.includes(code));
      }) || {};
    return projects;
  };

  getTaskDetails = async (taskNumber, selectedProjectId) => {
    const projectId =
      selectedProjectId || this.__getProjectIdFromNumber(taskNumber);
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

  getSprints = async projectId => {
    this.sprintIds = await this.__getSprints(projectId);

    return this.sprintIds;
  };

  createTask = async ({ description, time, title, sprint, project }) => {
    const task = await this.__createTask(
      description,
      time,
      title,
      sprint,
      project
    );

    return task;
  };

  postTime = async ({ description, taken, date, taskId, projectId }) => {
    const res = await this.__postTime(
      description,
      taken,
      date,
      taskId,
      projectId
    );

    return res;
  };

  uploadAllProjects = async () => {
    const projects = await this.__uploadProjectsList();

    projects.forEach(project => {
      if (!this.projectsList.find(({ id }) => id === project.id)) {
        this.projectsList.push(project);
      }
    });

    return this.projectsList;
  };

  //--> requests:

  __getSprints = async projectId => {
    const data = {
      ...this.requestData,
      "project-id": projectId
    };

    const res = await fetch(`${this.basicUrl}/tasks/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json());

    const taskIds = this.__parseTaskDetails(res);
    const sprintIds = taskIds.filter(({ hc }) => hc === "1"); // has children

    Logger.log(moduleName, `found sprints:  ${sprintIds.length}`);
    return sprintIds;
  };

  __createTask = async (description, time, title, sprint, project) => {
    const data = {
      ...this.requestData,
      description,
      effort: time,
      title: title,
      "parent-id": sprint,
      "project-id": project
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

  __postTime = async (description, taken, date, taskId, projectId) => {
    const data = {
      ...this.requestData,
      description,
      "task-id": taskId,
      "project-id": projectId,
      taken,
      date
    };

    const res = await fetch(`${this.basicUrl}/posts/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json());

    Logger.log(moduleName, `posted time:  ${res}`);
    return res;
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

    const parsedData =
      res &&
      res.projects &&
      res.projects.map(({ id, name }) => ({ id, name, code: "" }));

    return parsedData || [];
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
      "project-id": projectId,
      "search-depth": "project"
    };

    const res = await fetch(`${this.basicUrl}/tasks/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json());

    const tasks = this.__parseTaskDetails(res);
    return tasks[0] || {};
  };

  __getProjectIdFromNumber = (taskNumber = "") => {
    const currentProject =
      this.projectsList.find(({ code }) => {
        const separatedCodes = code.split(" ").filter(Boolean);

        return separatedCodes.some(code => taskNumber.includes(code));
      }) || {};

    return currentProject.id;
  };
}
