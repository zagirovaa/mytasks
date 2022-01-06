import Group from './Group.js';
import About from './About.js';

let myTasks = {};

const aboutModalContext = {
    'title': 'About',
    'name': 'MyTasks',
    'version': '0.3.5',
    'developer': 'Zagirov Abdul Askerovich'
};

document.addEventListener('DOMContentLoaded', () => {

    getData();
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
    setMenuItemsEventListeners();
});


function getData() {

    myTasks = JSON.parse(localStorage.getItem('MyTasks')) || {};

}


function saveData() {

    localStorage.setItem('MyTasks', JSON.stringify(myTasks));

}


function showAbout() {

    const aboutModal = new About(aboutModalContext);
    aboutModal.show();
    
}


function setMenuItemsEventListeners() {

    const menuItems = Array.from(document.querySelectorAll('a.navbar-item'));
    if (menuItems.length) {
        menuItems.forEach(el => {
            const menuText = el.textContent;
            switch (menuText) {
                case 'Add new group':
                    el.addEventListener('click', addGroup);
                    break;
                case 'Edit current group':
                    el.addEventListener('click', editGroup);
                    break;
                case 'Delete current group':
                    el.addEventListener('click', deleteGroup);
                    break;
                case 'Clear all groups':
                    el.addEventListener('click', clearGroups);
                    break;
                case 'Add new task':
                    el.addEventListener('click', addTask);
                    break;
                case 'Edit current task':
                    el.addEventListener('click', editTask);
                    break;
                case 'Delete current task':
                    el.addEventListener('click', deleteTask);
                    break;
                case 'Clear all tasks':
                    el.addEventListener('click', clearTasks);
                    break;
                case 'About':
                    el.addEventListener('click', showAbout);
                    break;
                case '&#171;':
                    el.addEventListener('click', moveToFirstPage);
                    break;
                case '&#8249;':
                    el.addEventListener('click', moveToPreviousPage);
                    break;
                case '&#8250;':
                    el.addEventListener('click', moveToNextPage);
                    break;
                case '&#187;':
                    el.addEventListener('click', moveToLastPage);
                    break;
            };
        });
    };

}


function setGroupItemsEventListeners() {

    // const groupItems = Array.from(document.querySelectorAll('a.group'));
    // if (groupItems.length) {
    //     groupItems.forEach(el => {
    //         let uuid = el.getAttribute('uuid');
    //         el.addEventListener('click', () => {
    //             makeGroupActive(uuid);
    //         });
    //     })
    // };

}


function makeGroupActive(uuid = currentIDs.currentGroupId) {

    // const currentGroupId = currentIDs.currentGroupId;
    // const groupItems = Array.from(document.querySelectorAll('a.group'));
    // currentIDs.currentGroupId = uuid;
    // saveIdsToStorage();
    // if (groupItems.length) {
    //     groupItems.forEach(el => {
    //         let selectedID = el.getAttribute('uuid');
    //         if (selectedID == uuid) {
    //             el.classList.add('has-background-info')
    //             el.classList.add('has-text-white');
    //         } else if (selectedID == currentGroupId) {
    //             el.classList.remove('has-background-info')
    //             el.classList.remove('has-text-white');
    //         };
    //     });
    // };

}


function addGroup() {

    // const groupName = window.prompt('Add new group name:', 'defaultName');
    // if (groupName.trim()) {
    //     if (myTasks) {
    //         for (let group = 0; group < myTasks.groups.length; group++) {
    //             if (myTasks.groups[group].name == groupName) {
    //                 window.alert('Group with the same name already exists.');
    //                 return;
    //             };
    //         };
    //     };
    //     let newGroup = new Group(groupName);
    //     myTasks.groups.push(newGroup);
    //     if (myTasks.groups.length == 1) {
    //         myTasks.currentGroupId = newGroup.uuid;
    //     };
    //     saveData();
    // } else {
    //     window.alert('You did not enter group name.');
    // };

}


function deleteGroup() {

    // for (let group = 0; group < myGroups.length; group++) {
    //     let uuidToRemove = myGroups[group].uuid;
    //     if (currentIDs.currentGroupId == uuidToRemove) {
    //         if (myGroups.length > 1) {
    //             if (myGroups[group - 1]) {
    //                 makeGroupActive(myGroups[group - 1].uuid);
    //             } else {
    //                 makeGroupActive(myGroups[group + 1].uuid);
    //             };
    //         };
    //         myGroups.splice(group, 1);
    //         let groupToRemove = document.querySelector('[uuid="' + uuidToRemove + '"]');
    //         groupToRemove.parentNode.removeChild(groupToRemove);
    //         saveGroupsToStorage();
    //         return;
    //     };
    // };

}


function clearGroups() {

    // localStorage.clear();
    // myGroups = [];
    // currentIDs = {};
    // renderPage();

}


function editGroup() {

    

}


function addTask() {

    

}


function editTask() {

    

}


function deleteTask() {

    

}


function clearTasks() {



}


function moveToFirstPage() {



}


function moveToPreviousPage() {

    

}


function moveToNextPage() {

    

}


function moveToLastPage() {

    

}