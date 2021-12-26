import { Group } from './mytasks.js';
import * as Subroutines from './subroutines.js';

const myStorage = window.localStorage;
const myGroups = [];
let currentGroupId = 0;
let currentTaskId = 0;

if (myStorage.length > 0) {
    for (let group = 0; group < myStorage.length; group++) {
        myGroups.push(JSON.parse(myStorage.getItem(myStorage.key(group))));
    };
} else {
    // let groupName = window.prompt('Enter group name:', 'defaultName');
    // if (groupName) {
    //     let newGroup = new Group(groupName);
    //     myStorage.setItem(newGroup.uuid, JSON.stringify(newGroup));
    //     myGroups.push(newGroup);
    // }
};

let data = {
    'app': {
        'title': 'MyTasks',
        'version': '0.3.5',
        'developer': 'Zagirov Abdul Askerovich'
    },
    'groups': myGroups
};

const mainPage = document.getElementById('html');
mainPage.innerHTML = nunjucks.render('../templates/base.html', data);

// Hamburger menu toggle
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

// Menu items click event listeners
const menuItems = Array.from(document.querySelectorAll('a.navbar-item'));
if (menuItems.length > 0) {
    menuItems.forEach(el => {
        el.addEventListener('click', () => {
            const menuText = el.textContent;
            switch (menuText) {
                case 'About':
                    Subroutines.showModal();
                    break;
                
            };
        });
    });
}

// About modal dialog close button
const helpDeleteButton = document.getElementById('help-modal-delete');
helpDeleteButton.addEventListener('click', () => {
    Subroutines.showModal();
});