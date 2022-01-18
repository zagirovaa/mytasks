import AboutModal from "../components/AboutModal.js";
import GroupModal from "../components/GroupModal.js";
import TaskModal from "../components/TaskModal.js";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../sw.js", { scope: "." }).then(reg => {
        if(reg.installing) {
            console.log("Service worker installing");
        } else if (reg.waiting) {
            console.log("Service worker installed");
        } else if (reg.active) {
            console.log("Service worker active");
        };
    }).catch(function(error) {
        console.log("Registration failed with " + error);
    });
};

let localDB = [];

const aboutModalContext = {
    "title": "About",
    "name": "MyTasks",
    "version": "0.3.5",
    "developer": "Zagirov Abdul Askerovich"
};

const MODE = {
    "ADD": 0,
    "EDIT": 1
};

loadData();

document.addEventListener("DOMContentLoaded", () => {
    setMenuItemsEventListeners();
    const navbarBurger = document.querySelector(".navbar-burger");
    navbarBurger.addEventListener("click", () => {
        const target = document.getElementById(navbarBurger.dataset.target);
        navbarBurger.classList.toggle("is-active");
        target.classList.toggle("is-active");
    });
});


function getData() {

    localDB = JSON.parse(localStorage.getItem("localDB")) || [];

};


function saveData() {

    localStorage.setItem("localDB", JSON.stringify(localDB));

};


function loadData() {

    getData();
    if (localDB.length) {
        const groupsPanel = document.getElementById("groups-panel");
        const activeGroup = getActiveGroup();
        const groupCount = document.getElementById("groups-count");
        const renderText = localDB.reduce((result, current) => {
            result += `<a id="${current.uuid}" class="panel-block is-radiusless">${current.name}</a>`;
            return result;
        }, "");
        groupsPanel.insertAdjacentHTML("beforeend", renderText);
        drawActiveGroup(activeGroup.uuid);
        groupCount.textContent = localDB.length;
        localDB.forEach(el => {
            document.getElementById(el.uuid).addEventListener("click", () => {
                makeGroupActive(el.uuid);
            });
        });
    };

}


function groupExists(name) {

    for (let group of localDB) {
        if (group.name === name) {
            return true;
        };
    };
    return false;

}


function getActiveGroup() {

    for (let group of localDB) {
        if (group.active) {
            return group;
        };
    };
    return {};

}


function getGroupIndexByUUID(uuid) {

    if (localDB.length) {
        for (let group = 0; group < localDB.length; group++) {
            if (localDB[group].uuid === uuid) {
                return group;
            };
        };
    };
    return -1;

}


function drawActiveGroup(uuid) {

    if (localDB.length) {
        const activePanelBlock = document.getElementById(uuid);
        activePanelBlock.classList.add("has-background-info", "has-text-white");
    }

}


function makeGroupActive(uuid) {

    const currentActiveGroup = document.getElementById(getActiveGroup().uuid);
    const newActiveGroup = document.getElementById(uuid);
    currentActiveGroup.classList.remove("has-background-info", "has-text-white");
    newActiveGroup.classList.add("has-background-info", "has-text-white");
    localDB[getGroupIndexByUUID(getActiveGroup().uuid)].active = false;
    localDB[getGroupIndexByUUID(uuid)].active = true;
    saveData();

};


function setMenuItemsEventListeners() {

    const menuItems = Array.from(document.querySelectorAll("a.navbar-item"));
    menuItems.forEach(el => {
        const menuText = el.textContent;
        switch (menuText) {
            case "Add new group":
                el.addEventListener("click", addGroup);
                break;
            case "Edit current group":
                el.addEventListener("click", editGroup);
                break;
            case "Delete current group":
                el.addEventListener("click", deleteGroup);
                break;
            case "Clear all groups":
                el.addEventListener("click", clearGroups);
                break;
            case "Add new task":
                el.addEventListener("click", addTask);
                break;
            case "Edit current task":
                el.addEventListener("click", editTask);
                break;
            case "Delete current task":
                el.addEventListener("click", deleteTask);
                break;
            case "Clear all tasks":
                el.addEventListener("click", clearTasks);
                break;
            case "About":
                el.addEventListener("click", showAbout);
                break;
            case "&#171;":
                el.addEventListener("click", moveToFirstPage);
                break;
            case "&#8249;":
                el.addEventListener("click", moveToPreviousPage);
                break;
            case "&#8250;":
                el.addEventListener("click", moveToNextPage);
                break;
            case "&#187;":
                el.addEventListener("click", moveToLastPage);
                break;
        };
    });

};


function addGroup() {

    const groupModal = new GroupModal(MODE.ADD, localDB);
    groupModal.show();

};


function editGroup() {

    if (localDB.length) {
        const groupModal = new GroupModal(MODE.EDIT, localDB);
        groupModal.show();
    } else {
        alert("No active group.")
    };

};


function deleteGroup() {

    const activeGroupID = getActiveGroup().uuid;
    const currentActiveIndex = getGroupIndexByUUID(activeGroupID);
    const groupCount = document.getElementById("groups-count");
    if (localDB.length > 1) {
        if (localDB[currentActiveIndex - 1]) {
            makeGroupActive(localDB[currentActiveIndex - 1].uuid);
        } else {
            makeGroupActive(localDB[currentActiveIndex + 1].uuid);
        };
    };
    document.getElementById(activeGroupID).remove();
    localDB.splice(currentActiveIndex, 1);
    groupCount.textContent = localDB.length;
    saveData();
    drawActiveGroup(getActiveGroup().uuid);

};


function clearGroups() {

    localStorage.clear();
    localDB = [];
    location.reload();

};


function addTask() {

    const taskModal = new TaskModal(MODE.ADD, localDB);
    taskModal.show();

};


function editTask() {

    const taskModal = new TaskModal(MODE.EDIT, localDB);
    taskModal.show();

};


function deleteTask() {

    

};


function clearTasks() {



};


function showAbout() {

    const aboutModal = new AboutModal(aboutModalContext);
    aboutModal.show();
    
};


function moveToFirstPage() {



};


function moveToPreviousPage() {

    

};


function moveToNextPage() {

    

};


function moveToLastPage() {

    

};


export {getData, saveData, groupExists, getActiveGroup, getGroupIndexByUUID, makeGroupActive};