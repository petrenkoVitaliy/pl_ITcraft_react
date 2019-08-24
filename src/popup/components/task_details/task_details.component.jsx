import React from 'react';

import './index.css';
import { JiraApi, ChromeApi, PlRequestsApi } from '../../../api';

export class TaskDetailsComponent extends React.Component {
  state = {
    taskNumber: '',
    taskData: '',
    settingsData: ''
  };

  async componentDidMount() {
    await this.getUserDetails();
    await this.getTaskNumber();
    await this.uploadTaskData();
  }

  getUserDetails = async () => {
    const data = await ChromeApi.getData('settingsData');

    this.plRequestsApi = new PlRequestsApi(data.settingsData);
    this.setState({ settingsData: data.settingsData });
  };

  getTaskNumber = async () => {
    const taskNumber = await JiraApi.getTaskNumber();

    this.setState({ taskNumber });
  };

  uploadTaskData = async () => {
    const { taskNumber } = this.state;
    const taskData = await this.plRequestsApi.getTaskDetailsFromAllSprints(
      taskNumber
    );
    this.setState({ taskData });
  };

  render() {
    const { taskNumber, taskData = {} } = this.state;

    return taskNumber ? (
      <div>
        <div>
          <p className='title_label'>task number:</p>
          <p className='input_label'>{taskNumber}</p>
        </div>
        <div>
          <p className='title_label'>title:</p>
          <p className='input_label'>{taskData.title}</p>
        </div>
        <div>
          <p className='title_label'>description:</p>
          <p className='input_label'>{taskData.description}</p>
        </div>
        <div>
          <p className='title_label'>path:</p>
          <p className='input_label'>{taskData.pathHuman}</p>
        </div>
        <div>
          <p className='title_label'>time taken:</p>
          <p className='input_label'>{taskData['time-taken']}</p>
        </div>
        <div>
          <p className='title_label'>time approve:</p>
          <p className='input_label'>{taskData['time-approved']}</p>
        </div>
        <div>
          <p className='title_label'>time effort:</p>
          <p className='input_label'>{taskData['time-effort']}</p>
        </div>
        <button type='button' onClick={this.uploadTaskData}>
          Reload
        </button>
      </div>
    ) : (
      <div>Cant find task number</div>
    );
  }
}
