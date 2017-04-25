"use strict";

const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
const crypto = require('../../lib/encriptar');

//le pedimos a mongoose el modelo de agente
const Usuario = mongoose.model('Usuario');
const jwt = require('jsonwebtoken');
const config = require('../../config');
require('../../models/CustomError')

const CustomError = mongoose.model('CustomError');


router.post('/authenticate', (req, res, next) => {
    //recibimos credenciales
    const correo = req.body.email;
    const clave = req.body.clave;

    //buscamos al usuario en la bd
    Usuario.findOne({ correo: correo }).exec((err, usuario) => {
        if (err) {
            next(err);

            return;
        }
        if (!usuario) {
            res.json({ success: false, error: new CustomError({ "mensaje": "Credenciales inexistentes", "status": 400 }) });
            return;
        }
        //comprobamos su clave
        var passEncriptada = crypto(correo, clave)
        if (passEncriptada !== usuario.clave) {
            res.json({ success: false, error: 'Credenciales incorrectas' });
            return;
        }

        //creamos un token JWT  
        jwt.sign({ usuario_id: usuario._id }, config.jwtSecret, config.jwtConfig,
            (err, token) => {
                if (err) {
                    next(err);
                    return;
                }
                //se lo devolvemos
                res.json({ succes: true, token: token })
            });
    });
});

router.post('/registro', (req, res, next) => {
    //recibimos credenciales
    const correo = req.body.email;
    const clave = req.body.clave;
    const nombre = req.body.nombre

    //buscamos al usuario en la bd
    Usuario.findOne({ correo: correo }).exec((err, usuario) => {
        if (err) {
            next(err);

            return;
        }
        if (usuario) {
            res.json({ success: false, error: 'Usuario existente' });
            return;
        }
        //comprobamos su clave
        var passEncriptada = crypto(correo, clave)
        if (!clave || !nombre || !correo) {
            res.json({ success: false, error: 'Rellene todos los campos' });
            return;
        }

        var usuario = new Usuario({ "correo": correo, "clave": clave, "nombre": nombre });
        var passEncriptada = crypto(correo, clave);
        usuario.clave = passEncriptada;
        usuario.save(function(err, usuarioCreado) {
            if (err) throw err;
            console.log('Usuario ' + usuarioCreado.nombre + ' creado');
        });


        //creamos un token JWT  
        jwt.sign({ usuario_id: usuario._id }, config.jwtSecret, config.jwtConfig,
            (err, token) => {
                if (err) {
                    next(err);
                    return;
                }
                //se lo devolvemos
                res.json({ succes: true, token: token })
            });
    });
});

module.exports = router;