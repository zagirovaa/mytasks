export default class Navbar {
    static render(appName) {
        return `
            <nav
                class="navbar is-fixed-top is-link"
                role="navigation"
                aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item">
                        <span class="material-icons mr-3 md-36">
                            add_task
                        </span>
                        <h4 class="has-text-weight-bold is-size-4">
                            ${appName}
                        </h4>
                    </a>
                    <a
                        role="button"
                        class="navbar-burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarMain">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbarMain" class="navbar-menu">
                    <div class="navbar-start">
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">
                                <span class="material-icons mr-2">
                                    view_agenda
                                </span>
                                <span>Group</span>
                            </a>
                            <div class="navbar-dropdown">
                                <a class="navbar-item">Add new group</a>
                                <a class="navbar-item is-disable">
                                    Edit current group
                                </a>
                                <a class="navbar-item is-disable">
                                    Delete current group
                                </a>
                                <hr class="navbar-divider">
                                <a class="navbar-item is-disable">
                                    Clear all groups
                                </a>
                            </div>
                        </div>
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">
                                <span class="material-icons mr-2">
                                    task
                                </span>
                                <span>Task</span>
                            </a>
                            <div class="navbar-dropdown">
                                <a class="navbar-item is-disable">
                                    Add new task
                                </a>
                                <a class="navbar-item is-disable">
                                    Edit current task
                                </a>
                                <a class="navbar-item is-disable">
                                    Delete current task
                                </a>
                                <hr class="navbar-divider">
                                <a class="navbar-item is-disable">
                                    Clear all tasks
                                </a>
                            </div>
                        </div>
                        <a
                            class="navbar-item navbar-item-one"
                            id="settings-button">
                            <span class="material-icons mr-2">
                                settings
                            </span>
                            <span>Settings</span>
                        </a>
                        <a
                            class="navbar-item navbar-item-one"
                            id="about-button">
                            <span class="material-icons mr-2">
                                help
                            </span>
                            <span>About</span>
                        </a>
                    </div>
                    <div class="navbar-end">
                        <a
                            class="navbar-item has-tooltip-left is-disable"
                            data-tooltip="First page">
                            <span class="material-icons">first_page</span>
                        </a>
                        <a
                            class="navbar-item has-tooltip-left is-disable"
                            data-tooltip="Previous page">
                            <span class="material-icons">navigate_before</span>
                        </a>
                        <span
                            id="pagination"
                            class="navbar-item has-text-white
                                has-background-link is-medium is-disable">
                            0 of 0
                        </span>
                        <a
                            class="navbar-item has-tooltip-left is-disable"
                            data-tooltip="Next page">
                            <span class="material-icons">navigate_next</span>
                        </a>
                        <a
                            class="navbar-item has-tooltip-left is-disable"
                            data-tooltip="Last page">
                            <span class="material-icons">last_page</span>
                        </a>
                    </div>
                </div>
            </nav>
        `;
    }
}