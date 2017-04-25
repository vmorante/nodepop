"use strict";

const jwt = require('jsonwebtoken');
const crypto = require('crypto');


module.exports = function encriptar(user, pass) {
    var hmac = crypto.createHmac('sha1', user).update(pass).digest('hex');

    return hmac
}