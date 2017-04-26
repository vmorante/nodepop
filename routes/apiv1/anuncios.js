'use strict';

const express = require('express');

const router = express.Router();

//const mongoose = require('mongoose');

//le pedimos a mongoose el modelo de anuncio
//const Anuncio = mongoose.model('Anuncio');

//jSON web token
const jwtAuth = require('../../lib/jwtAuth');
router.use(jwtAuth);



//var anuncio = new Anuncio({ nombre: 'Bicicleta', venta: true, precio: '230.15', foto: 'bici.jpg', tags: ['lifestyle', 'mobile'] })

/*anuncio.save(function(err, anuncioCreado) {
    if (err) throw err;
    console.log('Anuncio ' + anuncioCreado.nombre + ' creado');
});
*/
/* jshint ignore:start */

router.get('/', (req, res, next) => {

    const tags = req.query.tags;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const nombre = req.query.nombre;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const select = req.query.select;
    const sort = req.query.sort;
    const start = parseInt(req.query.start);
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


    Anuncio.list(criterios, limit, skip, select, sort, start, (err, anuncios) => {
        if (err) {

            next(err);
            return;
        }

        res.json({ success: true, result: anuncios });

    });

});

router.get('/tags', function(req, res) {
    Anuncio.listTag(req.query, function(err, tags) {
        if (err) return res.json({ result: false, err: err });
        //Cuando esten disponibles los mando en JSON
        var arrayTags = [];
        tags.forEach(function(element) {
            arrayTags.push(element.tags);
        });

        var uniqueList = arrayTags.toString().split(',').filter(function(item, i, allItems) {
            return i == allItems.indexOf(item);
        }).join(',');

        //res.send('Tags Disponibles: ' + uniqueList);
        res.render('tags', { result: true, tags: uniqueList });
    });
});

//POST /apiv1/anuncios
router.post('/', (req, res, next) => {
    const datosAnuncio = req.body;

    //creo instancia de anuncio
    const anuncio = new Anuncio(datosAnuncio);
    if (anuncio.validate) {
        //la guardo en la base de datos
        anuncio.save((err, anuncioGuardado) => {
            if (err) {
                next(err);
                return;
            }
            res.json({ success: true, result: anuncioGuardado });

        })
    } else {
        console.log(anuncio.validate.message)
            //res.json({ success: false, result: anuncioGuardado });

    }



})




//PUT /apiv1/anuncios
router.put('/:id', (req, res, next) => {
    const datosAnuncio = req.body;
    const _id = req.params.id;
    Anuncio.update({ _id: _id }, datosAnuncio, (err) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ success: true });
    })
})


module.exports = router;