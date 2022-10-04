export default class AboutModal {

    #developer; #name; #title; #version;
    
    constructor(app) {
        this.#developer = app.developer;
        this.#name = app.name;
        this.#title = app.title;
        this.#version = app.version;
    }

    close() {
        document.getElementById("about-modal").remove();
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
                        <h3 class="title is-3">${this.#name}</h3>
                        <h5 class="subtitle is-5">Version ${this.#version}</h5>
                        <h6 class="subtitle is-6">
                            - Created using -<br>
                            Html ✦ Css ✦ Javascript ✦ Bulma
                        </h6>
                        <h6 class="subtitle is-6">
                            - Developer -<br>
                            ${this.#developer}
                        </h6>
                    </section>
                </div>
            </div>
        `;
    }

}