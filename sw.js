self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                "index.html",
                "src/assets/images/icon-192.png",
                "src/assets/images/icon-512.png",
                "src/assets/images/apple-touch-icon.png",
                "src/assets/images/favicon-16x16.png",
                "src/assets/images/favicon-32x32.png",
                "src/assets/images/favicon.ico",
                "src/components/AboutModal.js",
                "src/components/Content.js",
                "src/components/GroupModal.js",
                "src/components/Navbar.js",
                "src/components/NotifyBox.js",
                "src/components/SettingsModal.js",
                "src/components/TaskModal.js",
                "src/assets/css/style.css",
                "main.js",
                "src/Group.js",
                "src/Task.js"
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