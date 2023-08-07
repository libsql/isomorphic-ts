import { default as nodeFetch } from "node-fetch";
import http from "node:http";
import https from "node:https";

// workaround this bug: https://github.com/node-fetch/node-fetch/issues/1735

const httpAgent = new http.Agent({keepAlive: true});
const httpsAgent = new https.Agent({keepAlive: true});

function agentSelector(parsedUrl) {
    if (parsedUrl.protocol === "https:") {
        return httpsAgent;
    } else {
        return httpAgent;
    }
}

export function fetch(resource, options = {}) {
    return nodeFetch(resource, {agent: agentSelector, ...options});
}

export { Request, Response, Headers } from 'node-fetch';
