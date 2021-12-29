import Group from './mytasks.js';

export const myStorage = window.localStorage;
export const myGroups = [];
export const currentIDs = {
    'currentGroupId': '',
    'currentTaskId': ''
};


export function getData() {

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


export function renderPage() {

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


export function makeGroupActive(uuid) {

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
    };

}


export function addGroup() {

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
        document.location.reload();

    } else {
        window.alert('You did not enter group name.');
    };

}


export function editGroup() {

    

}


export function deleteGroup() {

    

}


export function clearGroups() {

    myStorage.clear();
    myGroups.length = 0;
    document.location.reload();

}


export function addTask() {

    

}


export function editTask() {

    

}


export function deleteTask() {

    

}


export function clearTasks() {



}


export function showAbout() {

    const aboutModal = document.getElementById('about-modal');
    aboutModal.classList.toggle('is-active');
    
}


export function moveToFirstPage() {



}


export function moveToPreviousPage() {

    

}


export function moveToNextPage() {

    

}


export function moveToLastPage() {

    

}