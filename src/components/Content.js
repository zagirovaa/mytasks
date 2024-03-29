export default class Content {
    static render() {
        return `
            <div class="columns p-0 m-0">
                <div
                    class="column no-padding-right is-5-tablet
                        is-4-desktop is-3-widescreen">
                    <nav id="groups-panel" class="panel is-shadowless">
                        <p class="panel-heading is-radiusless
                                is-flex is-justify-content-space-between">
                            <span class="is-flex is-align-items-center">
                                <span>Groups</span>
                                <span class="material-icons arrow
                                            ml-1 has-text-weight-bold">
                                    expand_less
                                </span>
                            </span>
                            <span
                                id="groups-count"
                                class="tag is-dark is-pulled-right">
                                0
                            </span>
                        </p>
                    </nav>
                </div>
                <div class="column">
                    <nav id="tasks-panel" class="panel is-shadowless">
                        <p class="panel-heading is-radiusless
                                is-flex is-justify-content-space-between">
                            <span class="is-flex is-align-items-center">
                                <span>Tasks</span>
                                <span class="material-icons arrow ml-1
                                            has-text-weight-bold">
                                    expand_less
                                </span>
                            </span>
                            <span
                                id="tasks-count"
                                class="tag is-dark is-pulled-right">
                                0
                            </span>
                        </p>
                    </nav>
                </div>
            </div>
        `;
    }
}