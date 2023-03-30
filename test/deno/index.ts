//import WebSocket from "npm:@libsql/isomorphic-ws";
//import fetch from "npm:@libsql/isomorphic-fetch";
import WebSocket from "../../isomorphic-ws/web.mjs";
import fetch from "../../isomorphic-fetch/web.mjs";

const ws = new WebSocket("ws://localhost:8080");
ws.onopen = (event) => {
    ws.send("Hello from Deno");
};
ws.onmessage = (event) => {
    console.dir(event.data);
    ws.close();
};

fetch("http://localhost:8080").then((response) => {
    response.text().then((text) => {
        console.log(text);
    });
});
