"use strict";

const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

//le pedimos a mongoose el modelo de anuncio
const Anuncio = mongoose.model('Anuncio');

//var anuncio = new Anuncio({ nombre: 'Bicicleta', venta: true, precio: '230.15', foto: 'bici.jpg', tags: ['lifestyle', 'mobile'] })

/*anuncio.save(function(err, anuncioCreado) {
    if (err) throw err;
    console.log('Anuncio ' + anuncioCreado.nombre + ' creado');
});
*/
router.get('/', (req, res, next) => {
    console.log(req.usuario_id);
    const tags = req.query.tags;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const select = req.query.select;
    const sort = req.query.sort;
    const criterios = {};
    if (tags) {
        criterios.tags = tags;
    }
    if (venta) {
        criterios.venta = venta;
    }
    if (precio) {
        criterios.precio = precio;
    }


    Anuncio.list(criterios, limit, skip, select, sort, (err, anuncios) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ success: true, result: anuncios });

    });

});


module.exports = router;