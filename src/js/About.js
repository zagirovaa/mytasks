export default class {

    #title; #name; #version; #developer;
    constructor(context) {
        this.#title = context.title;
        this.#name = context.name,
        this.#version = context.version;
        this.#developer = context.developer;
    };
    show() {
        const app = document.getElementById('app');
        app.insertAdjacentHTML('beforeend', this.render());
        const aboutDeleteButton = document.getElementById('about-modal-delete');
        aboutDeleteButton.addEventListener('click', this.close);
    };
    close() {
        const app = document.getElementById('app');
        const modal = document.getElementById('about-modal');
        app.removeChild(modal);
    };
    render() {
        return `
            <div class="modal is-active" id='about-modal'>
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">${this.#title}</p>
                        <button class="delete" aria-label="close" id='about-modal-delete'></button>
                    </header>
                    <section class="modal-card-body has-text-centered">
                        <h3 class="title is-3">${this.#name}</h3>
                        <h5 class="subtitle is-5">Version ${this.#version}</h5>
                        <h6 class="subtitle is-6">
                            - Created using -<br>
                            HTML ✦ CSS ✦ JAVASCRIPT ✦ BULMA
                        </h6>
                        <h6 class="subtitle is-6">
                            - Developer -<br>
                            ${this.#developer}
                        </h6>
                    </section>
                    <footer class="modal-card-foot"></footer>
                </div>
            </div>
        `;
    };

}