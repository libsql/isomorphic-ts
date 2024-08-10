"use strict";

const _Request = Request;
const _Headers = Headers;

const http = require("node:http");
const https = require("node:https");

const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });

function agentSelector(parsedUrl) {
    if (parsedUrl.protocol === 'https:') {
        return httpsAgent;
    } else {
        return httpAgent;
    }
}

function fetchWithAgentSelection(resource, options = {}) {
    let url = resource;
    let fetchOptions = options;
    
    if (resource.constructor.name === 'Request') {
        url = resource.url;
        fetchOptions = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            ...options
        };
    }

    const parsedUrl = new URL(url);
    const agent = agentSelector(parsedUrl);

    return fetch(url, { agent, ...fetchOptions });
}
module.exports = { fetch: fetchWithAgentSelection, Request: _Request, Headers: _Headers };