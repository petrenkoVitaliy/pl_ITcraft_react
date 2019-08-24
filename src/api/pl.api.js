export class PlRequestsApi {
  constructor({ userKey, managerKey, projectId, appKey }) {
    this.requestData = {
      'user-key': userKey,
      'manager-key': managerKey,
      'app-key': appKey,
      'project-id': projectId,
      'per-page': -1 // full data on one page,
      // 'parent-id': 205696 // test
    };

    this.sprints = [];
    this.tasksList = '';
    this.sprintIds = '';
    this.basicUrl = 'https://pl.itcraft.co/api/client-v1';
  }

  getTaskDetailsFromAllSprints = async taskNumber => {
    this.sprintIds = await this.getSprintsIdsList();
    this.tasksList = await this.getTasksList(this.sprintIds);
    const task = this.tasksList.find(item => item.title.includes(taskNumber));

    console.log(`PlApi: found task from all:  ${JSON.stringify(task)}`);
    return task;
  };

  getTasksList = async sprintsIdsList => {
    const data = { ...this.requestData };

    const queries = sprintsIdsList.map(async item => {
      data['parent-id'] = item;

      const res = await fetch(`${this.basicUrl}/tasks/list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => {
        return response.json();
      });

      return this.parseTaskDetails(res);
    });

    const tasks = [];

    await Promise.all(queries).then(values => {
      values.forEach(item => tasks.push(...item));
    });

    return tasks;
  };

  getSprints = async () => {
    const data = { ...this.requestData, query: 'Sprint' };

    const res = await fetch(`${this.basicUrl}/tasks/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      return response.json();
    });

    this.sprintIds = this.parseTaskDetails(res);
    console.log(`PlApi: found sprints:  ${JSON.stringify(this.sprintIds)}`);

    return this.sprintIds;
  };

  getSprintsIdsList = async () => {
    const sprints = await this.getSprints();
    const sprintIds = sprints.map(item => item.id);

    return sprintIds;
  };

  // unused
  getTaskDetails = async taskNumber => {
    const data = { ...this.requestData, query: taskNumber };

    const res = await fetch(`${this.basicUrl}/tasks/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const task = this.parseTaskDetails(res)[0];
    return task;
  };

  createTask = async inputData => {
    const data = {
      ...this.requestData,
      description: inputData.description,
      effort: inputData.time,
      title: inputData.title,
      'parent-id': inputData.sprint
    };

    const res = await fetch(`${this.basicUrl}/tasks/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      return response.json();
    });

    const task = this.parseTaskDetails(res)[0];
    console.log(`PlApi: created task:  ${JSON.stringify(task)}`);

    return task;
  };

  parseTaskDetails = data => {
    if (!data || !data.tasks || !data.tasks.data) {
      return [];
    }

    return data.tasks.data;
  };
}
