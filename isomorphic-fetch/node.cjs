"use strict";

const nodeFetch = require("node-fetch");
const { Request, Response, Headers } = nodeFetch;

const http = require("node:http");
const https = require("node:https");

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

function fetch(resource, options = {}) {
    return nodeFetch(resource, {agent: agentSelector, ...options});
}

module.exports = {fetch, Request, Response, Headers};
