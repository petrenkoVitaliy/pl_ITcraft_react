import React from 'react';
import { Container, Button } from 'nes-react';

import withLoad from './load.hoc';
import { LoaderComponent } from '../../../loader';
import './index.css';

class TaskDetails extends React.Component {
  renderTaskDetailsField = (label, value) =>
    value && (
      <>
        <p className='title_label'>{`${label}:`}</p>
        <p className='input_label'>{value}</p>
      </>
    );

  render() {
    const { taskNumber = '', taskData = {} } = this.props.loadedData;

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

    return (
      <Container title='Task Info'>
        {taskNumber ? (
          <>
            {fieldsList.map(({ label, value }) =>
              this.renderTaskDetailsField(label, value)
            )}
            <Button warning onClick={() => this.uploadTaskData(taskNumber)}>
              Reload
            </Button>
          </>
        ) : (
          <>
            <div>Cant find task number</div>
            <LoaderComponent />
          </>
        )}
      </Container>
    );
  }
}

export const TaskDetailsComponent = withLoad(TaskDetails);
