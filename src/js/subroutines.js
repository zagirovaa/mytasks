import { myStorage, myGroups, currentGroupId, currentTaskId } from './app.js';
import Group from './mytasks.js';


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