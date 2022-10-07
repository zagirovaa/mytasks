export default class Navbar {
    static render(appName) {
        return `
            <nav
                class="navbar is-fixed-top is-info"
                role="navigation"
                aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item">
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
                            <a class="navbar-link">Group</a>
                            <div class="navbar-dropdown">
                                <a class="navbar-item">Add new group</a>
                                <a class="navbar-item">Edit current group</a>
                                <a class="navbar-item">Delete current group</a>
                                <hr class="navbar-divider">
                                <a class="navbar-item">Clear all groups</a>
                            </div>
                        </div>
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">Task</a>
                            <div class="navbar-dropdown">
                                <a class="navbar-item">Add new task</a>
                                <a class="navbar-item">Edit current task</a>
                                <a class="navbar-item">Delete current task</a>
                                <hr class="navbar-divider">
                                <a class="navbar-item">Clear all tasks</a>
                            </div>
                        </div>
                        <a class="navbar-item" id="settings-button">Settings</a>
                        <a class="navbar-item" id="about-button">About</a>
                    </div>
                    <div class="navbar-end">
                        <a
                            class="navbar-item has-tooltip-left"
                            data-tooltip="Первая страница">
                            <span class="material-icons">first_page</span>
                        </a>
                        <a
                            class="navbar-item has-tooltip-left"
                            data-tooltip="Предыдущая страница">
                            <span class="material-icons">navigate_before</span>
                        </a>
                        <span
                            id="pagination"
                            class="navbar-item has-text-white
                                has-background-info is-medium">
                            0 of 0
                        </span>
                        <a
                            class="navbar-item has-tooltip-left"
                            data-tooltip="Следующая страница">
                            <span class="material-icons">navigate_next</span>
                        </a>
                        <a
                            class="navbar-item has-tooltip-left"
                            data-tooltip="Последняя страница">
                            <span class="material-icons">last_page</span>
                        </a>
                    </div>
                </div>
            </nav>
        `;
    }
}