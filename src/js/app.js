import * as Subroutines from './subroutines.js';

export const myStorage = window.localStorage;
export const myGroups = [];
export let currentGroupId = 0;
export let currentTaskId = 0;

// Load all the data from localStorage
if (myStorage.length) {
    for (let group = 0; group < myStorage.length; group++) {
        myGroups.push(JSON.parse(myStorage.getItem(myStorage.key(group))));
    };
};

// Initializing context data
let data = {
    'app': {
        'title': 'MyTasks',
        'version': '0.3.5',
        'developer': 'Zagirov Abdul Askerovich'
    },
    'groups': myGroups,
    'active_group': currentGroupId,
    'active_task': currentTaskId
};

// Main page rendering
const mainPage = document.getElementById('html');
mainPage.innerHTML = nunjucks.render('../templates/base.html', data);

// Hamburger menu toggle event listener
document.addEventListener('DOMContentLoaded', () => {
    const navbarBurgers = Array.from(document.querySelectorAll('.navbar-burger'));
    if (navbarBurgers.length > 0) {
        navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                const target = el.dataset.target;
                const newTarget = document.getElementById(target);
                el.classList.toggle('is-active');
                newTarget.classList.toggle('is-active');
            });
        });
    };
});

// About modal dialog close button event listener
const helpDeleteButton = document.getElementById('help-modal-delete');
helpDeleteButton.addEventListener('click', () => {
    Subroutines.showAbout();
});

// Main menu items event listeners
const menuItems = Array.from(document.querySelectorAll('a.navbar-item'));
if (menuItems.length) {
    menuItems.forEach(el => {
        const menuText = el.textContent;
        switch (menuText) {
            case 'Add new group':
                el.addEventListener('click', Subroutines.addGroup);
                break;
            case 'Edit current group':
                el.addEventListener('click', Subroutines.editGroup);
                break;
            case 'Delete current group':
                el.addEventListener('click', Subroutines.deleteGroup);
                break;
            case 'Clear all groups':
                el.addEventListener('click', Subroutines.clearGroups);
                break;
            case 'Add new task':
                el.addEventListener('click', Subroutines.addTask);
                break;
            case 'Edit current task':
                el.addEventListener('click', Subroutines.editTask);
                break;
            case 'Delete current task':
                el.addEventListener('click', Subroutines.deleteTask);
                break;
            case 'Clear all tasks':
                el.addEventListener('click', Subroutines.clearTasks);
                break;
            case 'About':
                el.addEventListener('click', Subroutines.showAbout);
                break;
            // First page
            case '&#171;':
                el.addEventListener('click', Subroutines.moveToFirstPage);
                break;
            // Previous page
            case '&#8249;':
                el.addEventListener('click', Subroutines.moveToPreviousPage);
                break;
            // Next page
            case '&#8250;':
                el.addEventListener('click', Subroutines.moveToNextPage);
                break;
            // Last page
            case '&#187;':
                el.addEventListener('click', Subroutines.moveToLastPage);
                break;
        };
    });
}