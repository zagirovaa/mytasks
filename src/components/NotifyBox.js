export default class NotifyBox {

    message; timout; type;

    static close() {
        document.getElementById("notify-box").remove();
    }

    static show(message, type) {
        this.message = message;
        this.timeout = 2000;
        this.type = type;
        document.getElementById("app").insertAdjacentHTML(
            "beforeend", this.render()
        );
        document.getElementById("notify-box-close").addEventListener(
            "click", this.close
        );
        setTimeout(() => {
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