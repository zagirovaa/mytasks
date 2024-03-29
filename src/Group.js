import {v4 as uuidv4} from "uuid";

export default class Group {

    #active; #name; #tasks; #uuid;

    constructor(name) {
        this.#active = false;
        this.#name = name;
        this.#tasks = [];
        this.#uuid = "group-" + uuidv4();
    };

    get active() {
        return this.#active;
    };

    set active(active) {
        this.#active = active;
    };

    get name() {
        return this.#name;
    };

    set name(name) {
        this.#name = name;
    };

    get tasks() {
        return this.#tasks;
    };

    get uuid() {
        return this.#uuid;
    };
    
    toJSON() {
        return {
            "uuid": this.#uuid,
            "name": this.#name,
            "tasks": this.#tasks,
            "active": this.#active
        };
    };

};