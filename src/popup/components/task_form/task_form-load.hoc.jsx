import React from 'react';
import { ApiWrapper } from '../../../api';

const withLoad = Component => {
  return class extends React.Component {
    state = {
      title: '',
      sprintsList: [],
      lastSprintId: '',
      projects: [],
      projectId: ''
    };

    async componentDidMount() {
      const title = await ApiWrapper.jiraApi.getTaskTitle();
      const taskNumber = await ApiWrapper.jiraApi.getTaskNumber();
      const projects = ApiWrapper.plRequestsApi.getProjectsByTitle(taskNumber);

      const project = projects[0];
      const projectId = project ? project.id : '';

      const sprintsList = await ApiWrapper.plRequestsApi.getSprints(projectId);

      const lastSprint = sprintsList[sprintsList.length - 1];
      const lastSprintId = lastSprint ? lastSprint.id : '';

      this.setState({
        title: `${taskNumber} ${title || ''}`,
        sprintsList,
        lastSprintId,
        projects,
        projectId
      });
    }

    updateSprintList = async projectId => {
      const sprintsList = await ApiWrapper.plRequestsApi.getSprints(projectId);

      const lastSprint = sprintsList[sprintsList.length - 1];
      const lastSprintId = lastSprint ? lastSprint.id : '';

      this.setState({
        sprintsList,
        lastSprintId,
        projectId
      });
    };

    render() {
      return (
        <Component
          {...this.props}
          loadedData={this.state}
          updateSprintList={this.updateSprintList}
        />
      );
    }
  };
};

export default withLoad;
