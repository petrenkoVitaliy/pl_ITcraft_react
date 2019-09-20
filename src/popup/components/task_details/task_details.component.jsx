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
import moment from 'moment';

class TaskDetails extends React.Component {
  state = {
    shownPostIndex: undefined
  };

  componentDidUpdate(prevProps) {
    console.log(prevProps.isSubmitting);
    console.log(this.props.isSubmitting);
    if (
      prevProps.isSubmitting === true &&
      this.props.isSubmitting === false &&
      this.props.values.taken
    ) {
      this.setState({
        shownPostIndex: undefined
      });
    }
  }

  showPostForm = (index, taskId) => {
    this.props.setFieldValue('taskId', taskId);

    this.setState({
      shownPostIndex: this.state.shownPostIndex === index ? undefined : index
    });
  };

  closePostForm = () => {
    this.setState({
      shownPostIndex: undefined
    });
  };

  renderTaskDetailsField = (label, value) =>
    value && (
      <>
        <p className='title_label'>{`${label}:`}</p>
        <p className='input_label'>{value}</p>
      </>
    );

  renderPostForm = () => (
    <>
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
        <Field type='text' placeholder='description' name='description' />
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
              value={this.props.values.date}
              onChange={value => {
                this.props.setFieldValue('date', value);
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              maxDate={moment()}
            />
          </MuiPickersUtilsProvider>
        </div>
        <ErrorMessage name='date' component='div' />
      </div>
      <Button success type='submit'>
        Post
      </Button>
    </>
  );

  render() {
    const {
      taskNumber = '',
      taskData = [],
      uploadPage,
      setFieldValue,
      projectsList,
      changeProjectId
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
        <Form>
          <Field
            type={'select'}
            component={'select'}
            name={'projectId'}
            children={projectsList.map(item => (
              <option value={item.id}>{item.name}</option>
            ))}
            onChange={e => {
              changeProjectId(e.target.value);
              setFieldValue('projectId', e.target.value);
            }}
          />

          {taskNumber ? (
            <>
              {fieldsList.map((task, index) => (
                <Container title={`Task # ${index + 1}`}>
                  {task.map(({ label, value }) =>
                    this.renderTaskDetailsField(label, value)
                  )}
                  <Button
                    type='button'
                    success
                    onClick={
                      shownPostIndex === index
                        ? this.closePostForm
                        : () => this.showPostForm(index, task[0].value)
                    }
                  >
                    {`${
                      shownPostIndex === index ? 'Close' : 'Open'
                    } Post Details`}
                  </Button>
                  {shownPostIndex === index && this.renderPostForm()}
                </Container>
              ))}
              <Button warning onClick={() => uploadPage()} type='button'>
                Reload
              </Button>
            </>
          ) : (
            <>
              <div>Cant find task number</div>
              <LoaderComponent />
            </>
          )}
        </Form>
      </Container>
    );
  }
}

export const TaskDetailsComponent = withLoad(formHoc(TaskDetails));
