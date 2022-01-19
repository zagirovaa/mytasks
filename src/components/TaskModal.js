import Task from "../js/Task.js";
import { saveData, getActiveGroup, getActiveTask, makeTaskActive, drawActiveTask } from "../js/app.js";


export default class TaskModal {

    #title; #mode; #local_db;
    
    constructor(mode, local_db) {
        this.#mode = mode;
        if (this.#mode) {
            this.#title = "Edit task";
        } else {
            this.#title = "Add task";
        };
        this.#local_db = local_db;
    };

    show() {
        const app = document.getElementById("app");
        app.insertAdjacentHTML("beforeend", this.render());
        const taskModalClose = document.querySelectorAll(".task-modal-close");
        const taskModalApplyBtn = document.getElementById("task-modal-apply");
        const taskModalInput = document.getElementById("task-modal-input");
        const taskModalTextArea = document.getElementById("task-modal-textarea");
        taskModalClose.forEach(el => {
            el.addEventListener("click", TaskModal.close);
        });
        taskModalApplyBtn.addEventListener("click", () => {
            this.apply(this.#mode);
        });
        taskModalInput.addEventListener("keyup", event => {
            if (event.key === "Enter") {
                event.preventDefault();
                taskModalApplyBtn.click();
            };
        });
        if (this.#mode) {
            const activeTask = getActiveTask();
            taskModalInput.value = activeTask.title;
            taskModalTextArea.value = activeTask.message;
        };
        taskModalInput.focus();
    };

    apply(mode) {
        const taskTitle = document.getElementById("task-modal-input").value.trim() || "";
        const taskMessage = document.getElementById("task-modal-textarea").value.trim() || "";
        if (taskTitle && taskMessage) {
            if (mode) {
                // const activeGroup = getActiveGroup();
                // const groupModalInput = document.getElementById("group-modal-input");
                // const activePanelBlock = document.getElementById(activeGroup.uuid);
                // const newGroupName = groupModalInput.value;
                // activePanelBlock.textContent = newGroupName;
                // this.#local_db[getGroupIndex(activeGroup.uuid)].name = newGroupName;
                // saveData();
            } else {
                const newTask = new Task(taskTitle, taskMessage);
                const tasksPanel = document.getElementById("tasks-panel");
                const tasksCount = document.getElementById("tasks-count");
                const activeGroup = getActiveGroup();
                if (! activeGroup.tasks.length)  {
                    newTask.active = true;
                };
                activeGroup.tasks.push(newTask);
                saveData();
                tasksPanel.insertAdjacentHTML("beforeend", `
                    <a id="${newTask.uuid}" class="panel-block is-radiusless">
                        <div class="card is-shadowless">
                            <div class="card-content is-radiusless">
                                <div class="media">
                                    <div class="media-content">
                                        <p class="title is-4">${newTask.title}</p>
                                        <p class="subtitle is-6">
                                            <time datetime="${newTask.created}">${newTask.created}</time>
                                        </p>
                                    </div>
                                </div>
                                <div class="content">${newTask.message}</div>
                            </div>
                        </div>
                    </a>
                `);
                if (newTask.active) {
                    drawActiveTask(newTask.uuid);
                };
                tasksCount.textContent = activeGroup.tasks.length;
                document.getElementById(newTask.uuid).addEventListener("click", el => {
                    makeTaskActive(newTask.uuid);
                });
            };
            TaskModal.close();
        } else {
            alert("Fill in all the fields.");
        };
    };

    static close() {
        document.getElementById("task-modal").remove();
    };

    render() {
        return `
            <div class="modal is-active" id="task-modal">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">${this.#title}</p>
                        <button class="delete task-modal-close" aria-label="close"></button>
                    </header>
                    <section class="modal-card-body">
                        <div class="field">
                            <label class="label">Task title:</label>
                            <div class="control">
                                <input id="task-modal-input" class="input" type="text">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Task message:</label>
                            <div class="control">
                                <textarea id="task-modal-textarea" class="textarea"></textarea>
                            </div>
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                        <button id="task-modal-apply" class="button is-success">Apply</button>
                        <button class="button task-modal-close">Cancel</button>
                    </footer>
                </div>
            </div>
        `;
    };

}