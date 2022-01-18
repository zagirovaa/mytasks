import Group from "../js/Task.js";


export default class TaskModal {

    #title; #mode;
    
    constructor(mode) {
        this.#mode = mode;
        if (this.#mode) {
            this.#title = "Edit task";
        } else {
            this.#title = "Add task";
        };
    };

    show() {
        const app = document.getElementById("app");
        app.insertAdjacentHTML("beforeend", this.render());
        const taskModalClose = document.querySelectorAll(".task-modal-close");
        const taskModalApplyBtn = document.getElementById("task-modal-apply");
        const taskModalInput = document.getElementById("task-modal-input");
        const taskModalTextArea = document.getAnimations("task-modal-textarea");
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
            
        };
        taskModalInput.focus();
    };

    apply(mode) {
        
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

{/* <a class="panel-block has-background-info is-radiusless is-active">
    <div class="card is-shadowless ">
        <div class="card-content has-background-info is-radiusless">
            <div class="media">
                <div class="media-content">
                    <p class="title is-4 has-text-white">Title</p>
                    <p class="subtitle is-6 has-text-white">
                        <time datetime="2016-1-1">06-01-2021 11:33:18</time>
                    </p>
                </div>
            </div>
            <div class="content has-text-white">Lorem ipsum dolor sit amet consectetur.</div>
        </div>
    </div>
</a> */}