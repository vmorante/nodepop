'use strict';


const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [{
        type: String,

        validate: {
            validator: function(tags) {
                if (tags != 'mobile' && tags != 'lifestyle' && tags != 'work' && tags != 'motor') {
                    console.log('Los tags introducidos no son correctos');
                    return false;
                } else {
                    return true;
                }
            },
            message: 'Solo es valido..'
        }
    }]
});

anuncioSchema.statics.list = function(criterios, limit, skip, select, sort, start, callback) {
    const query = Anuncio.find(criterios);
    query.limit(limit);
    query.skip(skip);
    query.select(select);
    query.sort(sort);
    query.skip(start);
    query.exec(callback);



};



//creamos el modelo de anuncio

var Anuncio = mongoose.model('Anuncio', anuncioSchema);