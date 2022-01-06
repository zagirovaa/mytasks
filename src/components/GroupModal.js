export default class {

    #title;
    constructor(title) {
        this.#title = title;
    };
    show() {
        document.getElementById('app').insertAdjacentHTML('beforeend', this.render());
        document.querySelectorAll('.group-modal-close').forEach(el => {
            el.addEventListener('click', this.close);
        });
    };
    close() {
        document.getElementById('app').removeChild(document.getElementById('group-modal'));
    };
    render() {
        return `
            <div class="modal is-active" id="group-modal">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">${this.#title}</p>
                        <button class="delete group-modal-close" aria-label="close"></button>
                    </header>
                    <section class="modal-card-body">
                        <input class="input" type="text" placeholder="Enter group name">
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-success">Apply</button>
                        <button class="button group-modal-close">Cancel</button>
                    </footer>
                </div>
            </div>
        `;
    };

}