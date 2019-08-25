import React from 'react';

import { ApiWrapper } from '../../../api';
import { LoaderComponent } from '../../../loader';

import './index.css';

export class TaskDetailsComponent extends React.Component {
  state = {
    taskNumber: '',
    taskData: ''
  };

  async componentDidMount() {
    const taskNumber = await this.getTaskNumber();
    await this.uploadTaskData(taskNumber);
  }

  getTaskNumber = async () => {
    const taskNumber = await ApiWrapper.jiraApi.getTaskNumber();

    this.setState({ taskNumber });
    return taskNumber;
  };

  uploadTaskData = async taskNumber => {
    const taskData = await ApiWrapper.plRequestsApi.getTaskDetailsFromAllSprints(
      taskNumber
    );
    this.setState({ taskData });
  };

  renderTaskDetailsField = (label, value) =>
    value && (
      <div>
        <p className='title_label'>{`${label}:`}</p>
        <p className='input_label'>{value}</p>
      </div>
    );

  render() {
    const { taskNumber = '', taskData = {} } = this.state;

    const fieldsList = [
      {
        label: 'task number',
        value: taskNumber
      },
      {
        label: 'description',
        value: taskData.description
      },
      {
        label: 'path',
        value: taskData.pathHuman
      },
      {
        label: 'time taken',
        value: taskData['time-taken']
      },
      {
        label: 'time approve',
        value: taskData['time-approved']
      },
      {
        label: 'time effort',
        value: taskData['time-effort']
      }
    ];

    return taskNumber ? (
      <>
        {fieldsList.map(({ label, value }) =>
          this.renderTaskDetailsField(label, value)
        )}
        <button type='button' onClick={() => this.uploadTaskData(taskNumber)}>
          Reload
        </button>
      </>
    ) : (
      <>
        <div>Cant find task number</div>
        <LoaderComponent />
      </>
    );
  }
}
