import "bulma";
import "bulma-tooltip";

import AboutModal from "./components/AboutModal.js";
import Content from "./components/Content.js";
import GroupModal from "./components/GroupModal.js";
import Navbar from "./components/Navbar.js";
import NotifyBox from "./components/NotifyBox.js";
import SettingsModal from "./components/SettingsModal.js";
import TaskModal from "./components/TaskModal.js";

let localDB = [];

const settings = {
    "pagesCount": 0,
    "currentPage": 0,
    "tasksPerPage": 5
};

const helpContext = {
    "developer": "Zagirov Abdul Askerovich",
    "name": "MyTasks",
    "organization": "NETCON",
    "title": "About",
    "version": "0.5.5"
};

const modalMode = {
    "add": 0,
    "edit": 1
};

getData();

const app = document.getElementById("app");
app.insertAdjacentHTML("beforeend", Navbar.render(helpContext.name));
app.insertAdjacentHTML("beforeend", Content.render());

const groupsPanel = document.getElementById("groups-panel");
const groupsTick = document.querySelector("#groups-panel .tick");
const tasksPanel = document.getElementById("tasks-panel");
const tasksTick = document.querySelector("#tasks-panel .tick");
groupsPanel.addEventListener("click", el => {
    el.stopPropagation();
    toggleGroupsPanel();
    if (groupsTick.textContent.trim() === "⮝") {
        groupsTick.textContent = "⮟";
    } else {
        groupsTick.textContent = "⮝";
    }
});
tasksPanel.addEventListener("click", el => {
    el.stopPropagation();
    toggleTasksPanel();
    if (tasksTick.textContent.trim() === "⮝") {
        tasksTick.textContent = "⮟";
    } else {
        tasksTick.textContent = "⮝";
    }
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
    const navbarBurger = document.querySelector(".navbar-burger");
    const settingsMenuItem = document.getElementById("settings-button");
    const aboutMenuItem = document.getElementById("about-button");
    const menuItems = Array.from(document.querySelectorAll("a.navbar-item"));

    navbarBurger.addEventListener("click", () => {
        const target = document.getElementById(navbarBurger.dataset.target);
        navbarBurger.classList.toggle("is-active");
        target.classList.toggle("is-active");
    });
    
    settingsMenuItem.addEventListener("click", showSettings);
    aboutMenuItem.addEventListener("click", showAbout);

    menuItems.forEach(el => {
        const menuText = el.textContent.trim();
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
            case "first_page":
                el.addEventListener("click", moveToFirstPage);
                break;
            case "navigate_before":
                el.addEventListener("click", moveToPreviousPage);
                break;
            case "navigate_next":
                el.addEventListener("click", moveToNextPage);
                break;
            case "last_page":
                el.addEventListener("click", moveToLastPage);
                break;
        }
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
    localStorage.setItem(
        "localDB", JSON.stringify(localDB)
    );
    localStorage.setItem(
        "tasksPerPage", JSON.stringify(settings.tasksPerPage)
    );
}

function setGroupsEventListeners() {
    localDB.forEach(group => {
        document.getElementById(group.uuid).addEventListener("click", el => {
            el.stopPropagation();
            toggleActiveGroup(group.uuid);
        });
    });
}

function groupExists(name) {
    return localDB.filter(group => group.name === name).length > 0 ?
        true : false;
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
        activeGroup.classList.add("has-background-link", "has-text-white");
    }
}

function drawInActiveGroup() {
    const activeGroup = document.getElementById(getActiveGroup().uuid) || null;
    if (activeGroup) {
        activeGroup.classList.remove("has-background-link", "has-text-white");
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
    activeTask.classList.add("has-background-link");
    cardContent.classList.add("has-background-link");
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
        activeTaskElement.classList.remove("has-background-link");
        cardContent.classList.remove("has-background-link");
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
            settings.currentPage *
            settings.tasksPerPage -
            settings.tasksPerPage;
        const endItem = startItem + settings.tasksPerPage;
        const pageTasks = activeGroup.tasks.slice(startItem, endItem);
        return pageTasks;
    }
    return [];
}

function changePage() {
    const pageTasks = getCurrentPageTasks();
    if (pageTasks.length > 0) {
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

function toggleNavbarBurger() {
    document.querySelector(".navbar-burger").click();
}

function addGroup() {
    toggleNavbarBurger();
    new GroupModal(modalMode.add, localDB).show();
}

function editGroup() {
    toggleNavbarBurger();
    if (getActiveGroup()) {
        new GroupModal(modalMode.edit, localDB).show();
    }
}

function deleteGroup() {
    toggleNavbarBurger();
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
        NotifyBox.show("The group has been deleted.");
    }
}

function clearGroups() {
    toggleNavbarBurger();
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
        NotifyBox.show("All groups have been deleted.")
    }
}

function addTask() {
    toggleNavbarBurger();
    if (getActiveGroup()) {
        new TaskModal(modalMode.add).show();
    }
}

function editTask() {
    toggleNavbarBurger();
    if (getActiveTask()) {
        new TaskModal(modalMode.edit).show();
    }
}

function deleteTask() {
    toggleNavbarBurger();
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
        NotifyBox.show("The task has been deleted.");
    }
}

function clearTasks() {
    toggleNavbarBurger();
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
        NotifyBox.show("All tasks have been deleted.")
    }
}

function showSettings() {
    toggleNavbarBurger();
    new SettingsModal(settings).show();
}

function showAbout() {
    toggleNavbarBurger();
    new AboutModal(helpContext).show();
}

function moveToFirstPage() {
    toggleNavbarBurger();
    if (settings.pagesCount > 0) {
        settings.currentPage = 1;
        changePage();
    }
}

function moveToPreviousPage() {
    toggleNavbarBurger();
    if (settings.currentPage > 1) {
        settings.currentPage -= 1;
        changePage();
    }
}

function moveToNextPage() {
    toggleNavbarBurger();
    if (settings.currentPage < settings.pagesCount) {
        settings.currentPage += 1;
        changePage();
    }
}

function moveToLastPage() {
    toggleNavbarBurger();
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
    updateTasksList
};