"use strict";
const fetch = require("node-fetch");
module.exports = {
    fetch,
    Request: fetch.Request,
    Response: fetch.Response,
    Headers: fetch.Headers,
};
