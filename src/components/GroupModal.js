import {
    clearGroupsPanel,
    drawActiveGroup,
    getActiveGroup,
    getGroupIndex,
    groupExists,
    renderGroups,
    saveData,
    setGroupsEventListeners,
    sortGroups,
    toggleActiveGroup
} from "../js/app.js";
import Group from "../js/Group.js";
import NotifyBox from "./NotifyBox.js";

export default class GroupModal {

    #local_db; #mode; #title;
    
    constructor(mode, local_db) {
        this.#local_db = local_db;
        this.#mode = mode;
        if (this.#mode) {
            this.#title = "Edit group";
        } else {
            this.#title = "Add group";
        };
    }

    apply(mode) {
        const changedGroupName = document.getElementById(
            "group-modal-input"
        ).value.trim() || "";
        if (changedGroupName) {
            if (groupExists(changedGroupName)) {
                NotifyBox.show(
                    "There is already a group with an identical name.",
                    "warning"
                );
            } else {
                const groupsPanel = document.getElementById("groups-panel");
                const groupsCount = document.getElementById("groups-count");
                if (mode) {
                    this.#local_db[
                        getGroupIndex(getActiveGroup().uuid)
                    ].name = changedGroupName;
                } else {
                    const newGroup = new Group(changedGroupName);
                    if (this.#local_db.length === 0)  {
                        newGroup.active = true;
                    }
                    this.#local_db.push(newGroup);
                }
                saveData();
                sortGroups();
                clearGroupsPanel();
                groupsPanel.insertAdjacentHTML("beforeend", renderGroups());
                drawActiveGroup(getActiveGroup().uuid);
                groupsCount.textContent = this.#local_db.length;
                setGroupsEventListeners();
                this.close();
            }
        } else {
           NotifyBox.show("You did not enter a group name.", "danger");
        }
    }

    close() {
        document.getElementById("group-modal").remove();
    }

    show() {
        const app = document.getElementById("app");
        app.insertAdjacentHTML("beforeend", this.render());
        const groupModalClose = document.querySelectorAll(".group-modal-close");
        const groupModalApplyBtn = document.getElementById("group-modal-apply");
        const groupModalInput = document.getElementById("group-modal-input");
        groupModalClose.forEach(el => {
            el.addEventListener("click", this.close);
        });
        groupModalApplyBtn.addEventListener("click", () => {
            this.apply(this.#mode);
        });
        groupModalInput.addEventListener("keyup", event => {
            if (event.key === "Enter") {
                event.preventDefault();
                groupModalApplyBtn.click();
            };
        });
        if (this.#mode) {
            const activeGroup = getActiveGroup();
            groupModalInput.value = activeGroup.name;
        };
        groupModalInput.focus();
    }

    render() {
        return `
            <div class="modal is-active" id="group-modal">
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">${this.#title}</p>
                        <button
                            class="delete group-modal-close"
                            aria-label="close">
                        </button>
                    </header>
                    <section class="modal-card-body">
                        <div class="field">
                            <label class="label">Group name:</label>
                            <div class="control">
                                <input
                                    id="group-modal-input"
                                    class="input"
                                    type="text">
                            </div>
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                        <button
                            id="group-modal-apply"
                            class="button is-success">
                            Apply
                        </button>
                        <button class="button group-modal-close">Cancel</button>
                    </footer>
                </div>
            </div>
        `;
    }

}