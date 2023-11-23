import {format} from 'date-fns'
import Project from './project'
import Task from './task'
import Storage from './storage'

export default class Interface {

    static loadHome() {
        Interface.loadProjects();
        Interface.initProjectButtons();
        Interface.openProject('Inbox', document.getElementById('btn-default-project'));
        document.addEventListener('keydown', Interface.handleKeyboardInput);
    }

    static loadProjects(){
        Storage.getToDoList().getProjects().forEach((project) => {
            if(project.name !== 'Inbox' && project.name !== 'Today' && project.name !== 'This week'){
                Interface.createProject(project.name);
            }
        })
        Interface.initProjectButtons();
    }

    static loadProjectContent(projectName) {
        const projectPreview = document.getElementById('project-preview')
        projectPreview.innerHTML = `<h1 id="project-name">${projectName}</h1>
                                <div class="tasks-list" id="tasks-list"></div>`;

        if(projectName !== 'Today' && projectName !== 'This week'){
            projectPreview.innerHTML += `
            <button class="button-add-task" id="button-add-task">Add task</button>
            <div class="add-task-popup" id="add-task-popup">
          <input
            class="input-add-task-popup"
            id="input-add-task-popup"
            type="text"
          />
          <div class="add-task-popup-buttons">
            <button class="button-add-task-popup" id="button-add-task-popup">
              Add
            </button>
            <button
              class="button-cancel-task-popup"
              id="button-cancel-task-popup"
            >
              Cancel
            </button>
          </div>
        </div>`
        }
        Interface.loadTask(projectName);
    }


    static createProject(name){
        const userProjects = document.getElementById('workspace-list');
        userProjects.innerHTML += `
        <button class="button-project">
            <div class="left-project-pannel">
                <span>${name}</span>
            </div>
            <div class="right-project-pannel"></div>
        </button>`

        Interface.initProjectButtons();
    }

    static createTask(name, dueDate) {
        const tasksList = document.getElementById('task-list');
        tasksList.innerHTML += `
        <button class="button-task" data-task-button>
        <div class="left-task-panel">
          <p class="task-content">${name}</p>
          <input type="text" class="input-task-name" data-input-task-name>
        </div>
        <div class="right-task-panel">
          <p class="due-date" id="due-date">${dueDate}</p>
          <input type="date" class="input-due-date" data-input-due-date>
        </div>
      </button>`

      Interface.initProjectButtons();
    }

    static clear() {
        Interface.clearProjectPreview();
        Interface.clearProjects();
        Interface.clearTasks();
    }

    static clearProjectPreview(){
        const projectPreview = document.getElementById('project-preview');
        projectPreview.textContent = '';
    }

    static clearProjects(){
        const projectsList = document.getElementById('projects-list');
        projectsList.textContent = '';
    }

    static clearTasks(){
        const tasksList = document.getElementById('tasks-list');
        tasksList.textContent = '';
    }

    

}