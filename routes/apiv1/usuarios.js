"use strict";

const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

//le pedimos a mongoose el modelo de agente
const Usuario = mongoose.model('Usuario');


module.exports = router;