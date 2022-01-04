import Group from './mytasks.js';

const GROUPS_ITEM_NAME = 'GroupsItems';
const IDS_ITEM_NAME = 'IdsItems';

const myStorage = window.localStorage;
let myGroups = [];
let currentIDs = {};

renderPage();


function renderPage() {

    getData();
    const data = {
        'app': {
            'title': 'MyTasks',
            'version': '0.3.5',
            'developer': 'Zagirov Abdul Askerovich'
        },
        'groups': myGroups,
        'active_ids': currentIDs
    };
    const mainPage = document.querySelector('body');
    mainPage.innerHTML = nunjucks.render('../templates/main.html', data);
    setHamburgerMenuEventListener();
    setMenuItemsEventListeners();
    setAboutModalCloseEventListener();
    setGroupItemsEventListeners();

}


function getData() {

    if (myStorage.length) {
        myGroups = JSON.parse(myStorage.getItem(GROUPS_ITEM_NAME));
        const currentIDsItem = JSON.parse(myStorage.getItem(IDS_ITEM_NAME));
        currentIDs.currentGroupId = currentIDsItem.currentGroupId;
        currentIDs.currentTaskId = currentIDsItem.currentTaskId;
    };

}


function setHamburgerMenuEventListener() {

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


function setAboutModalCloseEventListener() {

    const aboutDeleteButton = document.getElementById('about-modal-delete');
    aboutDeleteButton.addEventListener('click', () => {
        showAbout();
    });

}


function setGroupItemsEventListeners() {

    const groupItems = Array.from(document.querySelectorAll('a.group'));
    if (groupItems.length) {
        groupItems.forEach(el => {
            let uuid = el.getAttribute('uuid');
            el.addEventListener('click', () => {
                makeGroupActive(uuid);
            });
        })
    };

}
 

function saveGroupsToStorage() {

    myStorage.setItem(GROUPS_ITEM_NAME, JSON.stringify(myGroups));

}


function saveIdsToStorage() {

    myStorage.setItem(IDS_ITEM_NAME, JSON.stringify(currentIDs));

}


function makeGroupActive(uuid = currentIDs.currentGroupId) {

    const currentGroupId = currentIDs.currentGroupId;
    const groupItems = Array.from(document.querySelectorAll('a.group'));
    currentIDs.currentGroupId = uuid;
    saveIdsToStorage();
    if (groupItems.length) {
        groupItems.forEach(el => {
            let selectedID = el.getAttribute('uuid');
            if (selectedID == uuid) {
                el.classList.add('has-background-info')
                el.classList.add('has-text-white');
            } else if (selectedID == currentGroupId) {
                el.classList.remove('has-background-info')
                el.classList.remove('has-text-white');
            };
        });
    };

}


function addGroup() {

    const groupName = window.prompt('Add new group name:', 'defaultName').trim();
    if (groupName) {
        if (myGroups.length) {
            for (let group = 0; group < myGroups.length; group++) {
                if (myGroups[group].name == groupName) {
                    window.alert('Group with the same name already exists.');
                    return;
                };
            };
        };
        let newGroup = new Group(groupName);
        myGroups.push(newGroup);
        saveGroupsToStorage();
        if (myGroups.length == 1) {
            currentIDs.currentGroupId = newGroup.uuid;
            saveIdsToStorage();
        };
        renderPage();
    } else {
        window.alert('You did not enter group name.');
    };

}


function editGroup() {

    

}


function deleteGroup() {

    for (let group = 0; group < myGroups.length; group++) {
        let uuidToRemove = myGroups[group].uuid;
        if (currentIDs.currentGroupId == uuidToRemove) {
            if (myGroups.length > 1) {
                if (myGroups[group - 1]) {
                    makeGroupActive(myGroups[group - 1].uuid);
                } else {
                    makeGroupActive(myGroups[group + 1].uuid);
                };
            };
            myGroups.splice(group, 1);
            let groupToRemove = document.querySelector('[uuid="' + uuidToRemove + '"]');
            groupToRemove.parentNode.removeChild(groupToRemove);
            saveGroupsToStorage();
            return;
        };
    };

}


function clearGroups() {

    myStorage.clear();
    myGroups = [];
    currentIDs = {};
    renderPage();

}


function addTask() {

    

}


function editTask() {

    

}


function deleteTask() {

    

}


function clearTasks() {



}


function showAbout() {

    const aboutModal = document.getElementById('about-modal');
    aboutModal.classList.toggle('is-active');
    
}


function moveToFirstPage() {



}


function moveToPreviousPage() {

    

}


function moveToNextPage() {

    

}


function moveToLastPage() {

    

}