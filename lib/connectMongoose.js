"use strict"

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const conn = mongoose.connection;

conn.on('err', (err) => {
    console.log('Error de conexion', err);
    procces.exit(1);
});

conn.once('open', () => {
    console.log('Conectando a mongodb');
});

//reliazamos la conexion
mongoose.connect('mongodb://localhost/nodepop');