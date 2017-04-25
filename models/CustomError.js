"use strict";

const mongoose = require('mongoose');

//creamos un esquema
//
const customErrorSchema = mongoose.Schema({
    mensaje: String,
    status: String
});

mongoose.model('CustomError', customErrorSchema);