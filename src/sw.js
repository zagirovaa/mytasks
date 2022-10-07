self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                "index.html",
                "assets/css/style.css",
                "main.js",
                "Group.js",
                "Task.js",
                "assets/images/icon-192.png",
                "assets/images/icon-512.png",
                "assets/images/apple-touch-icon.png",
                "assets/images/favicon-16x16.png",
                "assets/images/favicon-32x32.png",
                "assets/images/favicon.ico",
                "components/AboutModal.js",
                "components/Content.js",
                "components/GroupModal.js",
                "components/Navbar.js",
                "components/NotifyBox.js",
                "components/SettingsModal.js",
                "components/TaskModal.js"
            ]);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});