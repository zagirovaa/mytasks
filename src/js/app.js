import AboutModal from "../components/AboutModal.js";
import GroupModal from "../components/GroupModal.js";
import SettingsModal from "../components/SettingsModal.js";
import TaskModal from "../components/TaskModal.js";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../sw.js", { scope: "." }).then(reg => {
        if(reg.installing) {
            console.log("Service worker installing");
        } else if (reg.waiting) {
            console.log("Service worker installed");
        } else if (reg.active) {
            console.log("Service worker active");
        }
    }).catch(function(error) {
        console.log("Registration failed with " + error);
    });
}

let localDB = [];

const settings = {
    "pagesCount": 0,
    "currentPage": 0,
    "tasksPerPage": 5
};

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

getData();

const groupsPanel = document.getElementById("groups-panel");
const tasksPanel = document.getElementById("tasks-panel");
groupsPanel.addEventListener("click", el => {
    el.stopPropagation();
    toggleGroupsPanel();
});
tasksPanel.addEventListener("click", el => {
    el.stopPropagation();
    toggleTasksPanel();
});

if (localDB.length > 0) {
    const groupsCount = document.getElementById("groups-count");
    const activeGroup = getActiveGroup();
    sortGroups();
    groupsPanel.insertAdjacentHTML("beforeend", renderGroups());
    drawActiveGroup(activeGroup.uuid);
    groupsCount.textContent = localDB.length;
    setGroupsEventListeners()
    if (activeGroup.tasks.length > 0) {
        changePage();
    }
}

document.addEventListener("DOMContentLoaded", () => {
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
            case "Settings":
                el.addEventListener("click", showSettings);
                break;
            case "About":
                el.addEventListener("click", showAbout);
                break;
            case "«":
                el.addEventListener("click", moveToFirstPage);
                break;
            case "‹":
                el.addEventListener("click", moveToPreviousPage);
                break;
            case "›":
                el.addEventListener("click", moveToNextPage);
                break;
            case "»":
                el.addEventListener("click", moveToLastPage);
                break;
        }
    });
    const navbarBurger = document.querySelector(".navbar-burger");
    navbarBurger.addEventListener("click", () => {
        const target = document.getElementById(navbarBurger.dataset.target);
        navbarBurger.classList.toggle("is-active");
        target.classList.toggle("is-active");
    });
});

function getData() {
    localDB = JSON.parse(localStorage.getItem("localDB")) || [];
    const tasksPerPage = JSON.parse(localStorage.getItem("tasksPerPage")) || 0;
    if (tasksPerPage > 0) {
        settings.tasksPerPage = tasksPerPage;
    }
}

function saveData() {
    localStorage.setItem("localDB", JSON.stringify(localDB));
    localStorage.setItem("tasksPerPage", JSON.stringify(settings.tasksPerPage));
}

function setGroupsEventListeners() {
    localDB.forEach(group => {
        document.getElementById(group.uuid).addEventListener("click", el => {
            el.stopPropagation();
            toggleActiveGroup(group.uuid);
        });
    });
}

function sortGroups() {
    localDB = localDB.sort((a, b) => {
        const firstElement = a.name.toLowerCase();
        const secondElement = b.name.toLowerCase();
        if (firstElement < secondElement) {
            return -1;
        } else if (firstElement > secondElement) {
            return 1;
        } else {
            return 0;
        }
    });
}

function renderGroups() {
    return localDB.reduce((result, current) => {
        result += `
            <a
                id="${current.uuid}"
                class="panel-block is-radiusless">
                ${current.name}
            </a>
        `;
        return result;
    }, "");
}

function groupExists(name) {
    return localDB.filter(group => group.name === name).length > 0 ? true : false;
}

function getActiveGroup() {
    const activeGroup = localDB.filter(group => group.active);
    return activeGroup.length > 0 ? activeGroup[0] : false;
}

function getGroupIndex(uuid) {
    for (let index = 0; index < localDB.length; index++) {
        if (localDB[index].uuid === uuid) {
            return index;
        }
    }
    return -1;
}

function drawActiveGroup(uuid) {
    const activeGroup = document.getElementById(uuid) || null;
    if (activeGroup) {
        activeGroup.classList.add("has-background-info", "has-text-white");
    }
}

function drawInActiveGroup() {
    const activeGroup = document.getElementById(getActiveGroup().uuid) || null;
    if (activeGroup) {
        activeGroup.classList.remove("has-background-info", "has-text-white");
    }
}

function makeGroupActive(uuid) {
    localDB[getGroupIndex(getActiveGroup().uuid)].active = false;
    localDB[getGroupIndex(uuid)].active = true;
}

function toggleActiveGroup(uuid) {
    settings.currentPage = 0;
    settings.pagesCount = 0;
    drawInActiveGroup();
    drawActiveGroup(uuid);
    makeGroupActive(uuid);
    updateTasksList();
    saveData();
}

function toggleGroupsPanel() {
    const groups = Array.from(document.querySelectorAll("#groups-panel a"));
    groups.forEach(group => {
        if (group.style.display == "block" || group.style.display == "") {
            group.style.display = "none";
        } else {
            group.style.display = "block";
        }
    });
}

function clearGroupsPanel() {
    const panel = document.querySelector("#groups-panel .panel-heading");
    const allSiblings = [
        ...panel.parentElement.children
    ].filter(child => child !== panel);
    allSiblings.forEach(el => {
        el.remove();
    });
    document.getElementById("groups-count").textContent = "0";
}

function getActiveTask() {
    const activeGroup = getActiveGroup();
    if (activeGroup && activeGroup.tasks.length > 0) {
        for (const task of activeGroup.tasks) {
            if (task.active) {
                return task;
            }
        }
    }
    return false;
}

function getTaskIndex(uuid) {
    const activeGroup = getActiveGroup();
    if (activeGroup && activeGroup.tasks.length > 0) {
        for (let index = 0; index < activeGroup.tasks.length; index++) {
            if (activeGroup.tasks[index].uuid === uuid) {
                return index;
            }
        }
    }
    return -1;
}

function drawActiveTask(uuid) {
    const activeTask = document.getElementById(uuid);
    const cardContent = document.querySelector(`#${uuid} .card-content`);
    const taskTitle = document.querySelector(`#${uuid} .title`);
    const taskSubtitle = document.querySelector(`#${uuid} .subtitle`);
    const taskContent = document.querySelector(`#${uuid} .content`);
    activeTask.classList.add("has-background-info");
    cardContent.classList.add("has-background-info");
    taskTitle.classList.add("has-text-white");
    taskSubtitle.classList.add("has-text-white");
    taskContent.classList.add("has-text-white");
}

function drawInActiveTask() {
    const activeTask = getActiveTask();
    const activeTaskElement = document.getElementById(activeTask.uuid) || null;
    if (activeTaskElement) {
        const cardContent = document.querySelector(
            `#${activeTask.uuid} .card-content`
        );
        const taskTitle = document.querySelector(
            `#${activeTask.uuid} .title`
        );
        const taskSubtitle = document.querySelector(
            `#${activeTask.uuid} .subtitle`
        );
        const taskContent = document.querySelector(
            `#${activeTask.uuid} .content`
        );
        activeTaskElement.classList.remove("has-background-info");
        cardContent.classList.remove("has-background-info");
        taskTitle.classList.remove("has-text-white");
        taskSubtitle.classList.remove("has-text-white");
        taskContent.classList.remove("has-text-white");
    }
}

function makeTaskActive(uuid) {
    const activeGroup = getActiveGroup();
    activeGroup.tasks[getTaskIndex(getActiveTask().uuid)].active = false;
    activeGroup.tasks[getTaskIndex(uuid)].active = true;
}

function toggleActiveTask(uuid) {
    drawInActiveTask();
    drawActiveTask(uuid);
    makeTaskActive(uuid);
    saveData();
}

function toggleTasksPanel() {
    const tasks = Array.from(document.querySelectorAll("#tasks-panel a"));
    tasks.forEach(task => {
        if (task.style.display == "block" || task.style.display == "") {
            task.style.display = "none";
        } else {
            task.style.display = "block";
        }
    });
}

function clearTasksPanel() {
    const panel = document.querySelector("#tasks-panel .panel-heading");
    const allSiblings = [
        ...panel.parentElement.children
    ].filter(child => child !== panel);
    allSiblings.forEach(el => {
        el.remove();
    });
    document.getElementById("tasks-count").textContent = "0";
}

function getCurrentPageTasks() {
    const activeGroup = getActiveGroup();
    if (activeGroup) {
        if (activeGroup.tasks.length <= settings.tasksPerPage) {
            settings.pagesCount = 1;
            settings.currentPage = 1;
        } else {
            settings.pagesCount = Math.ceil(
                activeGroup.tasks.length / settings.tasksPerPage
            );
            if (settings.currentPage > settings.pagesCount) {
                settings.currentPage = settings.pagesCount;
            }
        }
        if (settings.currentPage === 0) {
            settings.currentPage = 1;
        }
        const startItem = 
            settings.currentPage * settings.tasksPerPage - settings.tasksPerPage;
        const endItem = startItem + settings.tasksPerPage;
        const pageTasks = activeGroup.tasks.slice(startItem, endItem);
        return pageTasks;
    }
}

function changePage() {
    const pageTasks = getCurrentPageTasks();
    if (pageTasks) {
        makeTaskActive(pageTasks[0].uuid);
        updateTasksList();
    }
}

function updateTasksList() {
    const activeGroup = getActiveGroup();
    const pagination = document.getElementById("pagination");
    if (activeGroup) {
        clearTasksPanel();
        if (activeGroup.tasks.length > 0) {
            const tasksPanel = document.getElementById("tasks-panel");
            const tasksCount = document.getElementById("tasks-count");
            const pageTasks = getCurrentPageTasks();
            const renderTasks = pageTasks.reduce((result, current) => {
                result += `
                    <a id="${current.uuid}" class="panel-block is-radiusless">
                        <div class="card is-shadowless">
                            <div class="card-content is-radiusless">
                                <div class="media">
                                    <div class="media-content">
                                        <p
                                            class="title is-4">
                                            ${current.title}
                                        </p>
                                        <p class="subtitle is-6">
                                            <time
                                                datetime="${current.created}">
                                                ${current.created}
                                            </time>
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
            toggleActiveTask(pageTasks[0].uuid);
            tasksCount.textContent = activeGroup.tasks.length;
            pageTasks.forEach(task => {
                document.getElementById(task.uuid).addEventListener(
                    "click",
                    el => {
                        el.stopPropagation();
                        toggleActiveTask(task.uuid);
                    }
                );
            });
        } else {
            settings.currentPage = 0;
            settings.pagesCount = 0;
        }
        pagination.textContent = `
            ${settings.currentPage} of ${settings.pagesCount}
        `;
    }
}

function addGroup() {
    new GroupModal(modalMode.add, localDB).show();
}

function editGroup() {
    if (getActiveGroup()) {
        new GroupModal(modalMode.edit, localDB).show();
    }
}

function deleteGroup() {
    if (getActiveGroup()) {
        const activeGroupID = getActiveGroup().uuid;
        const currentActiveIndex = getGroupIndex(activeGroupID);
        const groupCount = document.getElementById("groups-count");
        if (localDB.length > 1) {
            if (localDB[currentActiveIndex - 1]) {
                toggleActiveGroup(localDB[currentActiveIndex - 1].uuid);
            } else {
                toggleActiveGroup(localDB[currentActiveIndex + 1].uuid);
            }
        }
        localDB.splice(currentActiveIndex, 1);
        saveData();
        document.getElementById(activeGroupID).remove();
        groupCount.textContent = localDB.length;
        drawActiveGroup(getActiveGroup().uuid);
    }
}

function clearGroups() {
    if (localDB.length > 0) {
        const pagination = document.getElementById("pagination");
        localStorage.clear();
        localDB = [];
        clearGroupsPanel();
        clearTasksPanel();
        settings.currentPage = 0;
        settings.pagesCount = 0;
        pagination.textContent = `
            ${settings.currentPage} of ${settings.pagesCount}
        `;
    }
}

function addTask() {
    if (getActiveGroup()) {
        new TaskModal(modalMode.add).show();
    }
}

function editTask() {
    if (getActiveTask()) {
        new TaskModal(modalMode.edit).show();
    }
}

function deleteTask() {
    const activeGroup = getActiveGroup();
    if (activeGroup && activeGroup.tasks.length > 0) {
        const activeTaskID = getActiveTask().uuid;
        const currentActiveIndex = getTaskIndex(activeTaskID);
        const tasksCount = document.getElementById("tasks-count");
        if (activeGroup.tasks.length > 1) {
            if (activeGroup.tasks[currentActiveIndex - 1]) {
                makeTaskActive(activeGroup.tasks[currentActiveIndex - 1].uuid);
            } else {
                makeTaskActive(activeGroup.tasks[currentActiveIndex + 1].uuid);
            }
        }
        activeGroup.tasks.splice(currentActiveIndex, 1);
        saveData();
        document.getElementById(activeTaskID).remove();
        tasksCount.textContent = activeGroup.tasks.length;
        updateTasksList();
    }
}

function clearTasks() {
    const activeGroup = getActiveGroup();
    if (activeGroup && activeGroup.tasks.length > 0) {
        const pagination = document.getElementById("pagination");
        activeGroup.tasks.length = 0;
        saveData();
        clearTasksPanel();
        settings.currentPage = 0;
        settings.pagesCount = 0;
        pagination.textContent = `
            ${settings.currentPage} of ${settings.pagesCount}
        `;
    }
}

function showSettings() {
    new SettingsModal(settings).show();
}

function showAbout() {
    new AboutModal(helpContext).show();
}

function moveToFirstPage() {
    if (settings.pagesCount > 0) {
        settings.currentPage = 1;
        changePage();
    }
}

function moveToPreviousPage() {
    if (settings.currentPage > 1) {
        settings.currentPage -= 1;
        changePage();
    }
}

function moveToNextPage() {
    if (settings.currentPage < settings.pagesCount) {
        settings.currentPage += 1;
        changePage();
    }
}

function moveToLastPage() {
    if (settings.pagesCount > 0) {
        settings.currentPage = settings.pagesCount;
        changePage();
    }
}


export {
    changePage,
    clearGroupsPanel,
    drawActiveGroup,
    getActiveGroup,
    getActiveTask,
    getGroupIndex,
    getTaskIndex,
    groupExists,
    renderGroups,
    saveData,
    setGroupsEventListeners,
    sortGroups,
    toggleActiveGroup,
    updateTasksList
};