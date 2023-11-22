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

    }


}