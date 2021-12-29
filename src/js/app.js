import Group from './mytasks.js';

const myStorage = window.localStorage;
const myGroups = [];
const currentIDs = {
    'currentGroupId': '',
    'currentTaskId': ''
};

getData();
renderPage();
setHamburgetMenuEventListener();
setMenuItemsEventListeners();
setAboutModalCloseEventListener();
setGroupItemsEventListeners();


function getData() {

    if (myStorage.length) {
        for (let group = 0; group < myStorage.length; group++) {
            if (myStorage.key(group) != 'currentIDs') {
                myGroups.push(JSON.parse(myStorage.getItem(myStorage.key(group))));
            };
        };
        let ids = JSON.parse(myStorage.getItem('currentIDs'));
        currentIDs.currentGroupId = ids.currentGroupId;
        currentIDs.currentTaskId = ids.currentTaskId;
    };

}


function renderPage() {

    let data = {
        'app': {
            'title': 'MyTasks',
            'version': '0.3.5',
            'developer': 'Zagirov Abdul Askerovich'
        },
        'groups': myGroups,
        'active_ids': currentIDs
    };

    // Main page rendering
    const mainPage = document.querySelector('body');
    mainPage.innerHTML = nunjucks.render('../templates/main.html', data);

}


function setHamburgetMenuEventListener() {

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
                // First page
                case '&#171;':
                    el.addEventListener('click', moveToFirstPage);
                    break;
                // Previous page
                case '&#8249;':
                    el.addEventListener('click', moveToPreviousPage);
                    break;
                // Next page
                case '&#8250;':
                    el.addEventListener('click', moveToNextPage);
                    break;
                // Last page
                case '&#187;':
                    el.addEventListener('click', moveToLastPage);
                    break;
            };
        });
    };

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


function setAboutModalCloseEventListener() {

    const aboutDeleteButton = document.getElementById('about-modal-delete');
    aboutDeleteButton.addEventListener('click', () => {
        showAbout();
    });

}


function makeGroupActive(uuid = currentIDs.currentGroupId) {

    const currentGroupId = currentIDs.currentGroupId;
    const groupItems = Array.from(document.querySelectorAll('a.group'));
    currentIDs.currentGroupId = uuid;
    myStorage.setItem('currentIDs', JSON.stringify(currentIDs));
    if (groupItems.length) {
        groupItems.forEach(el => {
            let selectedUUID = el.getAttribute('uuid');
            if (selectedUUID == uuid) {
                el.classList.add('has-background-info')
                el.classList.add('has-text-white');
            } else if (selectedUUID == currentGroupId) {
                el.classList.remove('has-background-info')
                el.classList.remove('has-text-white');
            };
        });
        setGroupItemsEventListeners()
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
        myStorage.setItem(newGroup.uuid, JSON.stringify(newGroup));
        myGroups.push(newGroup);
        if (myGroups.length == 1) {
            currentIDs.currentGroupId = newGroup.uuid;
            myStorage.setItem('currentIDs', JSON.stringify(currentIDs));
        };
        const groupsPanel = document.getElementById('groups-panel');
        const addedGroup = `
            <a uuid="${newGroup.uuid}" class="group panel-block">${newGroup.name}</a>
        `;
        groupsPanel.innerHTML += addedGroup;
        makeGroupActive();
    } else {
        window.alert('You did not enter group name.');
    };

}


function editGroup() {

    

}


function deleteGroup() {

    

}


function clearGroups() {

    myStorage.clear();
    myGroups.length = 0;
    document.location.reload();

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