"use strict";


const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

anuncioSchema.statics.list = function(criterios, limit, skip, select, sort, callback) {
    const query = Anuncio.find(criterios);
    query.limit(limit);
    query.skip(skip);
    query.select(select);
    query.sort(sort);
    //query.start(start);
    query.exec(callback);



}



//creamos el modelo de anuncio

var Anuncio = mongoose.model('Anuncio', anuncioSchema);