export default class NotifyBox {

    message; timout; timer; type;

    static close() {
        document.getElementById("notify-box").remove();
    }

    static show(message, type="success") {
        this.message = message;
        this.timeout = 2000;
        this.type = type;
        document.getElementById("app").insertAdjacentHTML(
            "beforeend", this.render()
        );
        document.getElementById("notify-box-close").addEventListener(
            "click", () => {
                clearTimeout(this.timer);
                this.close();
            }
        );
        this.timer = setTimeout(() => {
            this.close();
        }, this.timeout);
    }

    static render() {
        return `
            <div
                class="notification is-${this.type}"
                id="notify-box">
                <button 
                    class="delete"
                    id="notify-box-close">
                </button>
                ${this.message}
            </div>
        `;
    }

}