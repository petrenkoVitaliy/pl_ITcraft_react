import React from 'react';
import { Container, Button } from 'nes-react';
import { Form, Field, ErrorMessage } from 'formik';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import withLoad from './task_details-load.hoc';
import { LoaderComponent } from '../../../loader';
import './index.css';
import formHoc from './task_details-form.hoc.jsx';

class TaskDetails extends React.Component {
  state = {
    shownPostIndex: undefined
  };

  togglePostForm = (index, taskId) => {
    this.setState({
      shownPostIndex: this.state.shownPostIndex === index ? undefined : index
    });
    this.props.setFieldValue('taskId', taskId);
  };

  renderTaskDetailsField = (label, value) =>
    value && (
      <>
        <p className='title_label'>{`${label}:`}</p>
        <p className='input_label'>{value}</p>
      </>
    );

  render() {
    const {
      taskNumber = '',
      taskData = [],
      uploadPage,
      values,
      setFieldValue
    } = this.props;
    const { shownPostIndex } = this.state;

    const fieldsList = taskData.map(item => [
      {
        label: 'task id',
        value: item.id
      },
      {
        label: 'task number',
        value: taskNumber
      },
      {
        label: 'description',
        value: item.description
      },
      {
        label: 'path',
        value: item.pathHuman
      },
      {
        label: 'time taken',
        value: item['time-taken']
      },
      {
        label: 'time approve',
        value: item['time-approved']
      },
      {
        label: 'time effort',
        value: item['time-effort']
      }
    ]);

    return (
      <Container title='Task Info'>
        {taskNumber ? (
          <>
            {fieldsList.map((task, index) => (
              <Container title={`Task # ${index + 1}`}>
                {task.map(({ label, value }) =>
                  this.renderTaskDetailsField(label, value)
                )}
                <Button
                  success
                  onClick={() => this.togglePostForm(index, task[0].value)}
                >
                  {`${
                    shownPostIndex === index ? 'Close' : 'Open'
                  } Post Details`}
                </Button>
                {shownPostIndex === index && (
                  <Form>
                    <div>
                      <label>Task id</label>
                      <Field type='text' disabled name='taskId' />
                    </div>
                    <div>
                      <label>Project id</label>
                      <Field type='text' disabled name='projectId' />
                    </div>
                    <div>
                      <label>Description</label>
                      <Field
                        type='text'
                        placeholder='description'
                        name='description'
                      />
                      <ErrorMessage name='description' component='div' />
                    </div>
                    <div>
                      <label>Time taken (in hours)</label>
                      <Field type='number' placeholder='taken' name='taken' />
                      <ErrorMessage name='taken' component='div' />
                    </div>
                    <div>
                      <label>Date</label>
                      <div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            name='date'
                            disableToolbar
                            variant='inline'
                            format='MM/dd/yyyy'
                            margin='normal'
                            value={values.date}
                            onChange={value => {
                              setFieldValue('date', value);
                            }}
                            KeyboardButtonProps={{
                              'aria-label': 'change date'
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                      <ErrorMessage name='date' component='div' />
                    </div>
                    <Button success type='submit'>
                      Post
                    </Button>
                  </Form>
                )}
              </Container>
            ))}
            <Button warning onClick={uploadPage}>
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

export const TaskDetailsComponent = withLoad(formHoc(TaskDetails));
