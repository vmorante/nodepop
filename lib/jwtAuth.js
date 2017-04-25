"use strict";

const jwt = require('jsonwebtoken');

const config = require('../config');

//exportamos middelaware de autenticacion
//
module.exports = function(req, res, next) {
    //recoger el token jwt 
    const token = req.body.token || req.query.token || req.get('x-access-token');

    //si no me llega token responde no autorizado
    if (!token) {
        const error = new Error('necesitas un token de autenticacion');
        error.status = 401;
        return next(error);
        return;
    }


    //validar token
    jwt.verify(token, config.jwtSecret, (err, tokenDecodificado) => {
        //si el token ha sido modificado o expirado
        //nos dra este error
        if (err) {

            const error = new Error('el token no es valido');
            error.status = 401;
            return next(error);
            return;

        }
        //el token es correcto
        req.usuario_id = tokenDecodificado.usuario_id;
        next();
    });

}