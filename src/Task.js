import {v4 as uuidv4} from "uuid";

export default class Task {

    #active; #created; #message; #title; #uuid;
    
    constructor(title, message) {
        this.#active = false;
        this.#created = new Date().toLocaleString();
        this.#message = message;
        this.#title = title;
        this.#uuid = "task-" + uuidv4();
    };

    get active() {
        return this.#active;
    };

    set active(active) {
        this.#active = active;
    };

    get created() {
        return this.#created;
    };

    get message() {
        return this.#message;
    };

    set message(message) {
        this.#message = message;
    };

    get title() {
        return this.#title;
    };

    set title(title) {
        this.#title = title;
    };

    get uuid() {
        return this.#uuid;
    };

    toJSON() {
        return {
            "uuid": this.#uuid,
            "title": this.#title,
            "message": this.#message,
            "created": this.#created,
            "active": this.#active
        };
    };

};