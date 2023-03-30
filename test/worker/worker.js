import { fetch } from "@libsql/isomorphic-fetch";
import { WebSocket } from "@libsql/isomorphic-ws";

addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);
    if (url.pathname === "/ws") {
        const response = new Promise((resolve, reject) => {
            const ws = new WebSocket("ws://localhost:8080");
            ws.addEventListener("open", (event) => {
                ws.send(JSON.stringify({"type": "hello"}));
            });
            ws.addEventListener("error", (event) => {
                reject();
            });
            ws.addEventListener("message", (event) => {
                resolve(new Response(event.data));
                ws.close();
            });
        });
        event.respondWith(response);
    } else if (url.pathname === "/fetch") {
        const response = fetch("http://localhost:8080")
            .then((resp) => resp.text())
            .then((text) => new Response(text));
        event.respondWith(response);
    } else {
        event.respondWith(new Response("Unknown path", { status: 404 }));
    }
});
