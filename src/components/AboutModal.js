export default class AboutModal {

    #developer; #name; #title; #organization; #version;
    
    constructor(app) {
        this.#developer = app.developer;
        this.#name = app.name;
        this.#organization = app.organization;
        this.#title = app.title;
        this.#version = app.version;
    }

    close() {
        document.getElementById("about-modal").remove();
    }

    current_year() {
        return new Date().getFullYear();
    }

    show() {
        document.getElementById("app").insertAdjacentHTML(
            "beforeend", this.render()
        );
        document.getElementById("about-modal-close").addEventListener(
            "click", this.close
        );
    }

    render() {
        return `
            <div class="modal is-active" id="about-modal">
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">${this.#title}</p>
                        <button
                            class="delete"
                            aria-label="close"
                            id="about-modal-close">
                        </button>
                    </header>
                    <section class="modal-card-body has-text-centered">
                        <h3 class="title is-3 has-text-link">${this.#name}</h3>
                        <h5 class="subtitle is-5">Version ${this.#version}</h5>
                        <h6 class="subtitle is-6">
                            <span class="has-text-link">
                                - Created using -
                            </span>
                            <br>
                            Html ✦ Css ✦ Javascript ✦ Bulma
                        </h6>
                        <h6 class="subtitle is-6">
                            <span class="has-text-link">
                                - Developer -
                            </span>
                            <br>
                            ${this.#developer}
                        </h6>
                    </section>
                    <footer
                        class="modal-card-foot is-flex is-justify-content-center">
                        <h6 class="subtitle is-6">
                            All rights reserved &copy;
                            ${this.#organization} ${this.current_year()}
                        </h6>
                    </footer>
                </div>
            </div>
        `;
    }

}