"use strict";
const WebSocket = require("@libsql/isomorphic-ws");
const fetch = require("@libsql/isomorphic-fetch");

const ws = new WebSocket("ws://localhost:8080");
ws.onopen = (event) => {
    ws.send("Hello from Node with CommonJS module");
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
