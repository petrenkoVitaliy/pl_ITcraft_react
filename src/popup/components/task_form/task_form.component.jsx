import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import withLoad from './task_form-load.hoc';
import formHoc from './task_form-form.hoc';
import './index.css';
import { Container, Button } from 'nes-react';

class TaskForm extends React.Component {
  renderField = props => (
    <div key={props.name}>
      <Field
        {...props}
        type={props.type || 'text'}
        component={props.component || 'input'}
        placeholder={props.placeholder || 'please input data'}
        name={props.name}
        children={props.renderChildrenFn && props.renderChildrenFn()}
        onChange={
          props.onChange &&
          (e => {
            props.onChange(e.target.value);
            this.props.setFieldValue(props.name, e.target.value);
          })
        }
      />
      <ErrorMessage name={props.name} component='div' />
    </div>
  );

  render() {
    const {
      loadedData: { sprintsList, projects },
      updateSprintList
    } = this.props;

    const fieldsList = [
      {
        component: 'select',
        name: 'project',
        renderChildrenFn: () =>
          projects.map(item => <option value={item.id}>{item.name}</option>),
        onChange: updateSprintList
      },
      {
        placeholder: 'Title',
        name: 'title'
      },
      {
        placeholder: 'Description',
        name: 'description',
        component: 'textarea',

        rows: '4',
        cols: '40'
      },
      {
        placeholder: 'Estimated time (minutes)',
        name: 'time',
        type: 'number'
      },
      {
        component: 'select',
        name: 'sprint',
        renderChildrenFn: () =>
          sprintsList.map(item => <option value={item.id}>{item.title}</option>)
      }
    ];

    return (
      <div className='task_form_wrapper'>
        <Form>
          <Container title='Create task form'>
            {fieldsList.map(item => this.renderField(item))}
            <Button primary type='submit'>
              Submit
            </Button>
          </Container>
        </Form>
      </div>
    );
  }
}

export const TaskFormComponent = withLoad(formHoc(TaskForm));
