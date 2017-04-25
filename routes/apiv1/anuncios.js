"use strict";

const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

//le pedimos a mongoose el modelo de anuncio
const Anuncio = mongoose.model('Anuncio');

//jSON web token
const jwtAuth = require('../../lib/jwtAuth');
router.use(jwtAuth);


//var anuncio = new Anuncio({ nombre: 'Bicicleta', venta: true, precio: '230.15', foto: 'bici.jpg', tags: ['lifestyle', 'mobile'] })

/*anuncio.save(function(err, anuncioCreado) {
    if (err) throw err;
    console.log('Anuncio ' + anuncioCreado.nombre + ' creado');
});
*/
router.get('/', (req, res, next) => {

    const tags = req.query.tags;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const nombre = req.query.nombre;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const select = req.query.select;
    const sort = req.query.sort;
    //const start = req.query.start;
    //var precioSplit = precio.split("-");
    const menor = /-\d/;
    const mayor = /\d-/;
    const entre = /\d-\d/;
    const igual = /\d/;
    const criterios = {};
    if (tags) {
        criterios.tags = tags;
    }
    if (venta) {
        criterios.venta = venta;
    }
    if (precio) {
        var precioSplit = precio.split("-");
        if (entre.test(precio)) {
            criterios.precio = { '$gte': precioSplit[0], '$lte': precioSplit[1] };
        } else if (mayor.test(precio)) {
            criterios.precio = { '$gte': precioSplit[0] };
        } else if (menor.test(precio)) {
            criterios.precio = { '$lte': precioSplit[1] };
        } else if (igual.test(precio)) {
            criterios.precio = precioSplit[0];
        }
    }
    if (nombre) {
        criterios.nombre = new RegExp('^' + req.query.nombre, "i");
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