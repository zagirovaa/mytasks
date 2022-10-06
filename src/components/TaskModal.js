import { 
    saveData, 
    getActiveGroup, 
    getActiveTask, 
    getTaskIndex, 
    updateTasksList
} from "../js/app.js";
import NotifyBox from "./NotifyBox.js";
import Task from "../js/Task.js";

export default class TaskModal {

    #mode; #title;
    
    constructor(mode) {
        this.#mode = mode;
        if (this.#mode) {
            this.#title = "Edit task";
        } else {
            this.#title = "Add task";
        }
    }

    apply(mode) {
        const taskTitle = document.getElementById(
            "task-modal-input"
        ).value.trim() || "";
        const taskMessage = document.getElementById(
            "task-modal-textarea"
        ).value.trim() || "";
        if (taskTitle && taskMessage) {
            if (mode) {
                const activeTask = getActiveTask();
                const activeGroup = getActiveGroup();
                const activeIndex = getTaskIndex(activeTask.uuid);
                activeGroup.tasks[activeIndex].title = taskTitle;
                activeGroup.tasks[activeIndex].message = taskMessage;
                saveData();
                document.querySelector(
                    `#${activeTask.uuid} .title`
                ).textContent = taskTitle;
                document.querySelector(
                    `#${activeTask.uuid} .content`
                ).textContent = taskMessage;
                NotifyBox.show(
                    "The task was successfully modified.", "success"
                );
            } else {
                const newTask = new Task(taskTitle, taskMessage);
                const tasksPanel = document.getElementById("tasks-panel");
                const tasksCount = document.getElementById("tasks-count");
                const activeGroup = getActiveGroup();
                if (activeGroup.tasks.length === 0) {
                    newTask.active = true;
                }
                activeGroup.tasks.push(newTask);
                saveData();
                updateTasksList();
                NotifyBox.show("A new task has been added.", "success");
            }
            this.close();
        } else {
            NotifyBox.show("Fill in all the required fields.", "danger");
        }
    }

    close() {
        document.getElementById("task-modal").remove();
    }

    show() {
        const app = document.getElementById("app");
        app.insertAdjacentHTML("beforeend", this.render());
        const taskModalClose = document.querySelectorAll(".task-modal-close");
        const taskModalApplyBtn = document.getElementById("task-modal-apply");
        const taskModalInput = document.getElementById("task-modal-input");
        const taskModalTextArea = document.getElementById(
            "task-modal-textarea"
        );
        taskModalInput.value = "";
        taskModalTextArea.value = "";
        taskModalClose.forEach(el => {
            el.addEventListener("click", this.close);
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
        }
        taskModalInput.focus();
    }

    render() {
        return `
            <div class="modal is-active" id="task-modal">
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">${this.#title}</p>
                        <button
                            class="delete task-modal-close"
                            aria-label="close">
                        </button>
                    </header>
                    <section class="modal-card-body">
                        <div class="field">
                            <label class="label">Task title:</label>
                            <div class="control">
                                <input
                                    id="task-modal-input"
                                    class="input"
                                    type="text">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Task message:</label>
                            <div class="control">
                                <textarea
                                    id="task-modal-textarea"
                                    class="textarea">
                                </textarea>
                            </div>
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                        <button
                            id="task-modal-apply"
                            class="button is-success">
                            Apply
                        </button>
                        <button class="button task-modal-close">Cancel</button>
                    </footer>
                </div>
            </div>
        `;
    }

}