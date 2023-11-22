import {compareAsc, toDate} from 'date-fns'
import Project from './project'
import Task from './task';

export default class ToDoList {
    constructor() {
        this.projects = [];
        this.projects.push(new Project('Inbox'));
        this.projects.push(new Project('Today'));
        this.projects.push(new Project('This week'));
    }

    setProjects(projects){
        this.projects = projects;
    }

    getProjects() {
        return this.projects;
    }

    getProject(projectName) {
        return this.projects.find((project) => project.getName() === projectName)
    }
    
    contains(projectName) {
        return this.projects.find((project) => project.getName() === projectName)
    }

    addProject(newProject) {
        if(this.projects.find((project) => project.name === newProject.name)) return
        this.projects.push(newProject);
    }

    deleteProject(projectName) {
        const selectedProject = this.project.find((project) => project.getName() === projectName)
        this.projects.splice(this.projects.indexOf(selectedProject), 1);
    }

}