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

const helpContext = {
    "title": "About",
    "name": "MyTasks",
    "version": "0.3.5",
    "developer": "Zagirov Abdul Askerovich"
};

const modalMode = {
    "add": 0,
    "edit": 1
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
        const groupsCount = document.getElementById("groups-count");
        const renderGroups = localDB.reduce((result, current) => {
            result += `<a id="${current.uuid}" class="panel-block is-radiusless">${current.name}</a>`;
            return result;
        }, "");
        groupsPanel.insertAdjacentHTML("beforeend", renderGroups);
        drawActiveGroup(activeGroup.uuid);
        groupsCount.textContent = localDB.length;
        localDB.forEach(el => {
            document.getElementById(el.uuid).addEventListener("click", () => {
                makeGroupActive(el.uuid);
            });
        });
        if (activeGroup.tasks.length) {
            const tasksPanel = document.getElementById("tasks-panel");
            const tasksCount = document.getElementById("tasks-count");
            const activeTask = getActiveTask();
            if (activeTask) {
                const renderTasks = activeGroup.tasks.reduce((result, current) => {
                    result += `
                        <a id="${current.uuid}" class="panel-block is-radiusless">
                            <div class="card is-shadowless">
                                <div class="card-content is-radiusless">
                                    <div class="media">
                                        <div class="media-content">
                                            <p class="title is-4">${current.title}</p>
                                            <p class="subtitle is-6">
                                                <time datetime="${current.created}">${current.created}</time>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="content">${current.message}</div>
                                </div>
                            </div>
                        </a>
                    `;
                    return result;
                }, "");
                tasksPanel.insertAdjacentHTML("beforeend", renderTasks);
                drawActiveTask(activeTask.uuid);
                tasksCount.textContent = activeGroup.tasks.length;
                activeGroup.tasks.forEach(el => {
                    document.getElementById(el.uuid).addEventListener("click", () => {
                        makeTaskActive(el.uuid);
                    });
                });
            };
        };
    };

}


function groupExists(name) {

    if (localDB.length) {
        for (const group of localDB) {
            if (group.name === name) {
                return true;
            };
        };
    };
    return false;

}


function getActiveGroup() {

    if (localDB.length) {
        for (const group of localDB) {
            if (group.active) {
                return group;
            };
        };
    };
    return {};

}


function getGroupIndex(uuid) {

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

    const activeGroup = document.getElementById(uuid) || null;
    if (activeGroup) {
        activeGroup.classList.add("has-background-info", "has-text-white");
    };

}


function makeGroupActive(uuid) {

    const activeGroup = document.getElementById(getActiveGroup().uuid) || null;
    if (activeGroup) {
        activeGroup.classList.remove("has-background-info", "has-text-white");
        drawActiveGroup(uuid);
        localDB[getGroupIndex(getActiveGroup().uuid)].active = false;
        localDB[getGroupIndex(uuid)].active = true;
        saveData();
    };

};


function getActiveTask() {

    const activeGroup = getActiveGroup();
    if (activeGroup.tasks.length) {
        for (const task of activeGroup.tasks) {
            if (task.active) {
                return task;
            };
        };
    };
    return {};

}


function makeTaskActive(uuid) {

    const activeGroup = getActiveGroup();
    const activeTask = getActiveTask();
    const activeTaskBlock = document.getElementById(activeTask.uuid) || null;
    if (activeTaskBlock) {
        const cardContent = document.querySelector(`#${activeTask.uuid} .card-content`);
        const title = document.querySelector(`#${activeTask.uuid} .title`);
        const subtitle = document.querySelector(`#${activeTask.uuid} .subtitle`);
        const content = document.querySelector(`#${activeTask.uuid} .content`);
        activeTaskBlock.classList.remove("has-background-info");
        cardContent.classList.remove("has-background-info");
        title.classList.remove("has-text-white");
        subtitle.classList.remove("has-text-white");
        content.classList.remove("has-text-white");
    };
    drawActiveTask(uuid);
    activeGroup.tasks[getTaskIndex(getActiveTask().uuid)].active = false;
    activeGroup.tasks[getTaskIndex(uuid)].active = true;
    saveData();

}


function getTaskIndex(uuid) {

    const activeGroup = getActiveGroup();
    if (activeGroup.tasks.length) {
        for (let task = 0; task < activeGroup.tasks.length; task++) {
            if (activeGroup.tasks[task].uuid === uuid) {
                return task;
            };
        };
    };
    return -1;

}


function drawActiveTask(uuid) {

    const activeTask = document.getElementById(uuid);
    const cardContent = document.querySelector(`#${uuid} .card-content`);
    const title = document.querySelector(`#${uuid} .title`);
    const subtitle = document.querySelector(`#${uuid} .subtitle`);
    const content = document.querySelector(`#${uuid} .content`);
    activeTask.classList.add("has-background-info");
    cardContent.classList.add("has-background-info");
    title.classList.add("has-text-white");
    subtitle.classList.add("has-text-white");
    content.classList.add("has-text-white");

}


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

    const groupModal = new GroupModal(modalMode.add, localDB);
    groupModal.show();

};


function editGroup() {

    if (getActiveGroup()) {
        const groupModal = new GroupModal(modalMode.edit, localDB);
        groupModal.show();
    };

};


function deleteGroup() {

    const activeGroupID = getActiveGroup().uuid;
    const currentActiveIndex = getGroupIndex(activeGroupID);
    const groupCount = document.getElementById("groups-count");
    if (localDB.length > 1) {
        if (localDB[currentActiveIndex - 1]) {
            makeGroupActive(localDB[currentActiveIndex - 1].uuid);
        } else {
            makeGroupActive(localDB[currentActiveIndex + 1].uuid);
        };
    };
    localDB.splice(currentActiveIndex, 1);
    saveData();
    document.getElementById(activeGroupID).remove();
    groupCount.textContent = localDB.length;
    drawActiveGroup(getActiveGroup().uuid);

};


function clearGroups() {

    localStorage.clear();
    localDB = [];
    document.getElementById("groups-count").textContent = "0";
    document.getElementById("tasks-count").textContent = "0";
    const panels = document.querySelectorAll(".panel-heading");
    panels.forEach(panel => {
        const allSiblings = [...panel.parentElement.children].filter(child => child !== panel);
        allSiblings.forEach(el => {
            el.remove();
        });
    });

};


function addTask() {

    const taskModal = new TaskModal(modalMode.add);
    taskModal.show();

};


function editTask() {

    const taskModal = new TaskModal(modalMode.edit);
    taskModal.show();

};


function deleteTask() {

    const activeGroup = getActiveGroup();
    if (activeGroup.tasks.length) {
        const activeTaskID = getActiveTask().uuid;
        const currentActiveIndex = getTaskIndex(activeTaskID);
        const taskCount = document.getElementById("tasks-count");
        if (activeGroup.tasks.length > 1) {
            if (activeGroup.tasks[currentActiveIndex - 1]) {
                makeTaskActive(activeGroup.tasks[currentActiveIndex - 1].uuid);
            } else {
                makeTaskActive(activeGroup.tasks[currentActiveIndex + 1].uuid);
            };
        };
        activeGroup.tasks.splice(currentActiveIndex, 1);
        saveData();
        document.getElementById(activeTaskID).remove();
        taskCount.textContent = activeGroup.tasks.length;
    };

};


function clearTasks() {

    const activeGroup = getActiveGroup();
    activeGroup.tasks = [];
    saveData();
    const panel = document.querySelector("#tasks-panel .panel-heading");
    const allSiblings = [...panel.parentElement.children].filter(child => child !== panel);
    allSiblings.forEach(el => {
        el.remove();
    });
    document.getElementById("tasks-count").textContent = "0";

};


function showAbout() {

    const aboutModal = new AboutModal(helpContext);
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


export {
    saveData, 
    groupExists, 
    getActiveGroup, 
    getGroupIndex, 
    makeGroupActive, 
    drawActiveTask, 
    getActiveTask,
    getTaskIndex, 
    makeTaskActive
};