"use strict";

const _Request = Request;
const _Headers = Headers;

const _fetch = fetch;

module.exports = { _fetch as fetch, Request: _Request, Headers: _Headers };
