"use strict";
const express = require('express');

const mongoose = require('mongoose');
const router = express.Router();

const i18n = require('./i18n');
router.use(i18n);

//creamos un esquema
//
const customErrorSchema = mongoose.Schema({
    mensaje: String,
    status: String
});

mongoose.model('CustomError', customErrorSchema);