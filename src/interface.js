import { format } from 'date-fns'
import Project from './project'
import Task from './task'
import Storage from './storage'

export default class Interface {

    static loadHomepage() {
        Interface.loadProjects();
        Interface.initProjectButtons();
        Interface.openProject('Inbox', document.getElementById('btn-inbox'));
        document.addEventListener('keydown', Interface.handleKeyboardInput);
    }

    static loadProjects() {
        Storage.getToDoList().getProjects().forEach((project) => {
            if (project.name !== 'Inbox' && project.name !== 'Today' && project.name !== 'This week') {
                Interface.createProject(project.name);
            }
        })
        Interface.initAddProjectButtons();
    }

    static loadTasks(projectName) {
        Storage.getToDoList().getProject(projectName).getTasks().forEach((task) => Interface.createTask(task.name, task.dueDate))

        if (projectName !== 'Today' && projectName !== 'This week') {
            Interface.initAddTaskButtons();
        }
    }


    static loadProjectContent(projectName) {
        const projectPreview = document.getElementById('project-preview')
        projectPreview.innerHTML = `<h1 id="project-name">${projectName}</h1>
                                <div class="tasks-list" id="tasks-list"></div>`;

        if (projectName !== 'Today' && projectName !== 'This week') {
            projectPreview.innerHTML += `
            <button class="button-add-task" id="button-add-task"><span class="material-symbols-outlined plus">
            add_circle
        </span>Add task</button>
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
        Interface.loadTasks(projectName);
    }

    // CREATE CONTENT

    static createProject(name) {
        const userProjects = document.getElementById('workspace-list');
        userProjects.innerHTML += `
        <button class="button-project"  data-project-button>
            <div class="left-project-pannel">
            <span class="material-symbols-outlined list">
            list
            </span><span>${name}</span>
            </div>
            <div class="right-project-pannel">
            <span class="material-symbols-outlined close">
                close
            </span></div>
        </button>`

        Interface.initProjectButtons();
    }

    static createTask(name, dueDate) {
        const tasksList = document.getElementById('tasks-list');
        tasksList.innerHTML += `
        <button class="button-task" data-task-button>
        <div class="left-task-panel">
            <span class="material-symbols-outlined circle">circle</span>
            <p class="task-content">${name}</p>
            <input type="text" class="input-task-name" data-input-task-name>
        </div>
        <div class="right-task-panel">
          <p class="due-date" id="due-date">${dueDate}</p>
          <input type="date" class="input-due-date" data-input-due-date>
          <span class="material-symbols-outlined close">
                close
            </span>
        </div>
      </button>`

        Interface.initTaskButtons();
    }

    static clear() {
        Interface.clearProjectPreview();
        Interface.clearProjects();
        Interface.clearTasks();
    }

    static clearProjectPreview() {
        const projectPreview = document.getElementById('project-preview');
        projectPreview.textContent = '';
    }

    static clearProjects() {
        const projectsList = document.getElementById('workspace-list');
        projectsList.textContent = '';
    }

    static clearTasks() {
        const tasksList = document.getElementById('tasks-list');
        tasksList.textContent = '';
    }

    static closeAllPopups() {
        Interface.closeAddProjectPopup()
        if (document.getElementById('button-add-task')) {
            Interface.closeAddTaskPopup();
        }
        if (document.getElementById('tasks-list') && document.getElementById('tasks-list').innerHTML !== '') {
            Interface.closeAllInputs();
        }
    }

    static closeAllInputs() {
        const taskButtons = document.querySelectorAll('[data-task-button]');

        taskButtons.forEach((button) => {
            Interface.closeRenameInput(button);
            Interface.closeSetDateInput(button);
        })
    }

    static handleKeyboardInput(e) {
        if (e.key === 'Escape') {
            Interface.closeAllPopups();
        }
    }


    //PROJECT ADD EVENT LISTNERES

    static initAddProjectButtons() {
        const addProjectButton = document.getElementById('btn-add-project');
        const addProjectPopupButton = document.getElementById('button-add-project');
        const cancelProjectPopupButton = document.getElementById('button-cancel-project');
        const addProjectPopupInput = document.getElementById('input-add-project-popup');

        addProjectButton.addEventListener('click', Interface.openAddProjectPopup);
        addProjectPopupButton.addEventListener('click', Interface.addProject);
        cancelProjectPopupButton.addEventListener('click', Interface.closeAddProjectPopup);
        addProjectPopupInput.addEventListener('keypress', Interface.handleAddProjectPopupInput);
    }

    static openAddProjectPopup() {
        const addProjectPopup = document.getElementById('add-project-popup');
        const addProjectButton = document.getElementById('btn-add-project');

        Interface.closeAllPopups();

        addProjectPopup.classList.add('active');
        addProjectButton.classList.add('active');
    }

    static closeAddProjectPopup() {
        const addProjectPopup = document.getElementById('add-project-popup');
        const addProjectButton = document.getElementById('btn-add-project');
        const addProjectPopupInput = document.getElementById('input-add-project-popup');

        addProjectPopup.classList.remove('active');
        addProjectButton.classList.remove('active');
        addProjectPopupInput.value = '';
    }

    static addProject() {
        const addProjectPopupInput = document.getElementById('input-add-project-popup');
        const projectName = addProjectPopupInput.value;

        if (projectName === '') {
            alert("Project name can't be empty");
            return;
        }

        if (Storage.getToDoList().contains(projectName)) {
            addProjectPopupInput.value = '';
            alert("Project names must be different");
            return;
        }

        Storage.addProject(new Project(projectName));
        Interface.createProject(projectName);
        Interface.closeAddProjectPopup();
    }

    static handleAddProjectPopupInput(e) {
        if (e.key === 'Enter') {
            Interface.addProject();
        }
    }


    // Project event listeners

    static initProjectButtons() {
        const inboxProjectsButton = document.getElementById('btn-inbox');
        const todayProjectsButton = document.getElementById('btn-today');
        const weekProjectsButton = document.getElementById('btn-week');
        const projectButtons = document.querySelectorAll('[data-project-button]');

        inboxProjectsButton.addEventListener('click', Interface.openInboxTasks);
        todayProjectsButton.addEventListener('click', Interface.openTodayTasks);
        weekProjectsButton.addEventListener('click', Interface.openWeekTasks);
        projectButtons.forEach((projectButton) => projectButton.addEventListener('click', Interface.handleProjectButton))
    }

    static openInboxTasks() {
        Interface.openProject('Inbox', this);
    }

    static openTodayTasks() {
        Storage.updateTodayProject();
        Interface.openProject('Today', this);
    }

    static openWeekTasks() {
        Storage.updateWeekProject();
        Interface.openProject('This week', this)
    }

    static handleProjectButton(e) {
        const projectName = this.children[0].children[1].textContent;

        if (e.target.classList.contains('close')) {
            Interface.deleteProject(projectName, this);
            return;
        }

        Interface.openProject(projectName, this);
    }

    static openProject(projectName, projectButton) {
        const defaultProjectButtons = document.querySelectorAll('.btn-default-project');
        const projectButtons = document.querySelectorAll('.button-project');
        const buttons = [...defaultProjectButtons, ...projectButtons];

        buttons.forEach((button) => button.classList.remove('active'));
        projectButton.classList.add('active');
        Interface.closeAddProjectPopup();
        Interface.loadProjectContent(projectName);
    }



    static deleteProject(projectName, button) {
        if (button.classList.contains('active')) {
            Interface.clearProjectPreview();
        }
        Storage.deleteProject(projectName);
        Interface.clearProjects();
        Interface.loadProjects();
    }



    // ADD TASK EVENT LISTENERS

    static initAddTaskButtons() {
        const addTaskButton = document.getElementById('button-add-task');
        const addTaskPopupButton = document.getElementById('button-add-task-popup');
        const cancelTaskPopupButton = document.getElementById('button-cancel-task-popup');
        const addTaskPopupInput = document.getElementById('input-add-task-popup');

        addTaskButton.addEventListener('click', Interface.openAddTaskPopup);
        addTaskPopupButton.addEventListener('click', Interface.addTask);
        cancelTaskPopupButton.addEventListener('click', Interface.closeAddTaskPopup);
        addTaskPopupInput.addEventListener('keypress', Interface.handleAddTaskPopupInput);
    }


    static openAddTaskPopup() {
        const addTaskPopup = document.getElementById('add-task-popup');
        const addTaskButton = document.getElementById('button-add-task');
        Interface.closeAllPopups();
        addTaskPopup.classList.add('active');
        addTaskButton.classList.add('active');
    }

    static closeAddTaskPopup() {
        const addTaskPopup = document.getElementById('add-task-popup');
        const addTaskButton = document.getElementById('button-add-task');
        const addTaskInput = document.getElementById('input-add-task-popup');

        addTaskPopup.classList.remove('active');
        addTaskButton.classList.remove('active');
        addTaskInput.value = '';
    }

    static addTask() {
        const projectName = document.getElementById('project-name').textContent;
        const addTaskPopupInput = document.getElementById('input-add-task-popup');
        const taskName = addTaskPopupInput.value;

        if (taskName === '') {
            alert("Task name can't be empty");
            return;
        }
        if (Storage.getToDoList().getProject(projectName).contains(taskName)) {
            alert("Task names must be different");
            addTaskPopupInput.value = '';
            return;
        }

        Storage.addTask(projectName, new Task(taskName));
        Interface.createTask(taskName, 'No date');
        Interface.closeAddTaskPopup();
    }

    static handleAddTaskPopupInput(e) {
        if (e.key === 'Enter') {
            Interface.addTask();
        }
    }


    // TASK EVENT LISTENERS

    static initTaskButtons() {
        const taskButtons = document.querySelectorAll('[data-task-button]');
        const taskNameInputs = document.querySelectorAll('[data-input-task-name]');
        const dueDateInputs = document.querySelectorAll('[data-input-due-date]');

        taskButtons.forEach((taskButton) => taskButton.addEventListener('click', Interface.handleTaskButton));
        taskNameInputs.forEach((taskNameInput) => taskNameInput.addEventListener('keypress', Interface.renameTask));
        dueDateInputs.forEach((dueDateInput) => dueDateInput.addEventListener('change', Interface.setTaskDate));

    }

    static handleTaskButton(e) {
        if (e.target.classList.contains('circle')) {
            Interface.setTaskCompleted(this);
            return;
        }
        if (e.target.classList.contains('close')) {
            Interface.deleteTask(this);
            return;
        }
        if (e.target.classList.contains('task-content')) {
            Interface.openRenameInput(this);
            return;
        }
        if (e.target.classList.contains('due-date')) {
            Interface.openSetDateInput(this);
        }
    }

    static setTaskCompleted(taskButton) {
        const projectName = document.getElementById('project-name').textContent;
        const taskName = taskButton.children[0].children[1].textContent;

        if (projectName === 'Today' || projectName === 'This week') {
            const parentProjectName = taskName.split('(')[1].split(')')[0];
            Storage.deleteTask(parentProjectName, taskName.split(' ')[0]);

            if (projectName === 'Today') {
                Storage.updateTodayProject();
            } else {
                Storage.updateWeekProject();
            }
        } else {
            Storage.deleteTask(projectName, taskName);
        }
        Interface.clearTasks();
        Interface.loadTasks(projectName);
    }

    static deleteTask(taskButton) {
        const projectName = document.getElementById('project-name').textContent;
        const taskName = taskButton.children[0].children[1].textContent;

        if (projectName === 'Today' || projectName === 'This week') {
            const mainProjectName = taskName.split('(')[1].split(')')[0]
            Storage.deleteTask(mainProjectName, taskName)
        }
        Storage.deleteTask(projectName, taskName)
        Interface.clearTasks();
        Interface.loadTasks(projectName);
    }

    static openRenameInput(taskButton) {
        const taskNamePara = taskButton.children[0].children[1];
        let taskName = taskNamePara.textContent;
        const taskNameInput = taskButton.children[0].children[2];
        const projectName = taskButton.parentNode.parentNode.children[0].textContent;

        if (projectName === 'Today' || projectName === 'This week') {
            [taskName] = taskName.split(' (');
        }

        Interface.closeAllPopups();
        taskNamePara.classList.add('active');
        taskNameInput.classList.add('active');
        taskNameInput.value = taskName;
    }

    static closeRenameInput(taskButton) {
        const taskName = taskButton.children[0].children[1];
        const taskNameInput = taskButton.children[0].children[2];

        taskName.classList.remove('active');
        taskNameInput.classList.remove('active');
        taskNameInput.value = '';
    }

    static renameTask(e) {
        if (e.key !== 'Enter') {
            return;
        }

        const projectName = document.getElementById('project-name').textContent;
        const taskName = this.previousElementSibling.textContent;
        const newTaskName = this.value;

        if (newTaskName === '') {
            alert("Task names can't be different");
            return;
        }

        if (Storage.getToDoList().getProject(projectName).contains(newTaskName)) {
            this.value = '';
            alert('Task names must be different');
            return;
        }

        if (projectName === 'Today' || projectName === 'This week') {
            const mainProjectName = taskName.split('(')[1].split(')')[0];
            const mainTaskName = taskName.split(' ')[0];
            Storage.renameTask(projectName, taskName, `${newTaskName} (${mainProjectName})`)
            Storage.renameTask(mainProjectName, mainTaskName, newTaskName);
        } else {
            Storage.renameTask(projectName, taskName, newTaskName);
        }

        Interface.clearTasks();
        Interface.loadTasks(projectName);
        Interface.closeRenameInput(this.parentNode.parentNode);
    }

    static openSetDateInput(taskButton) {
        const dueDate = taskButton.children[1].children[0];
        const dueDateInput = taskButton.children[1].children[1];

        Interface.closeAllPopups();
        dueDate.classList.add('active');
        dueDateInput.classList.add('active');
    }

    static closeSetDateInput(taskButton) {
        const dueDate = taskButton.children[1].children[0];
        const dueDateInput = taskButton.children[1].children[1];

        dueDate.classList.remove('active');
        dueDateInput.classList.remove('active');
    }

    static setTaskDate() {
        const taskButton = this.parentNode.parentNode;
        const projectName = document.getElementById('project-name').textContent;
        const taskName = taskButton.querySelector('.task-content').textContent; // Use querySelector to get the task name
        const newDueDate = format(new Date(this.value), 'dd/MM/yyyy');

        if (projectName === 'Today' || projectName === 'This week') {
            const mainProjectName = taskName.split('(')[1].split(')')[0];
            const mainTaskName = taskName.split(' (')[0];
            Storage.setTaskDate(projectName, taskName, newDueDate);
            Storage.setTaskDate(mainProjectName, mainTaskName, newDueDate);
            if (projectName === 'Today') {
                Storage.updateTodayProject();
            } else {
                Storage.updateWeekProject();
            }
        } else {
            Storage.setTaskDate(projectName, taskName, newDueDate); // Change to setTaskDate
        }
        Interface.clearTasks();
        Interface.loadTasks(projectName);
        Interface.closeSetDateInput(taskButton);
    }








}

