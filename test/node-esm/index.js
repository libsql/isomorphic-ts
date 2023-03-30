import WebSocket from "@libsql/isomorphic-ws";
import fetch from "@libsql/isomorphic-fetch";

const ws = new WebSocket("ws://localhost:8080");
ws.onopen = (event) => {
    ws.send("Hello from Node with ES modules");
};
ws.onmessage = (event) => {
    console.log(event.data);
    ws.close();
};

fetch("http://localhost:8080").then((response) => {
    response.text().then((text) => {
        console.log(text);
    });
});
