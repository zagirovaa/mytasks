export default class Group {

    #uuid; #name; #tasks;
    constructor(name) {
        this.#uuid = crypto.randomUUID();
        this.#name = name;
        this.#tasks = [];
    };
    get uuid() {
        return this.#uuid;
    };
    get name() {
        return this.#name;
    };
    set name(name) {
        this.#name = name;
    };
    getTask(uuid) {
        for (let task in this.#tasks) {
            if (task.uuid == uuid) {
                return task;
            };
        };
    };
    addTask(title, message) {
        let newTask = new Task(title, message);
        this.#tasks.push(newTask);
    };
    editTask(uuid, title, message) {
        let currentTask = this.getTask(uuid);
        if (currentTask) {
            currentTask.title = title;
            currentTask.message = message;
        };
    };
    removeTask(uuid) {
        for (let i = 0; i < this.#tasks.length; i++) {
            if (this.#tasks[i].uuid == uuid) {
                this.#tasks.splice(i, 1);
                break;
            };
        };
    };
    clearTasks() {
        this.#tasks = [];
    };
    toJSON() {
        return {
            'uuid': this.#uuid,
            'name': this.#name,
            'tasks': this.#tasks
        };
    };

};


class Task {

    #uuid; #title; #message; #created;
    constructor(title, message) {
        this.#uuid = crypto.randomUUID();
        this.#title = title;
        this.#message = message;
        this.#created = new Date().toLocaleString();
    };
    get uuid() {
        return this.#uuid;
    };
    get title() {
        return this.#title;
    };
    set title(title) {
        this.#title = title;
    };
    get message() {
        return this.#message;
    };
    set message(message) {
        this.#message = message;
    };
    get created() {
        return this.#created;
    };
    toJSON() {
        return {
            'uuid': this.#uuid,
            'title': this.#title,
            'message': this.#message,
            'created': this.#created
        };
    };

};