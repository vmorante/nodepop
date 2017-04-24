const mongoose = require('mongoose');
require('./lib/connectMongoose');
require('./models/Anuncio');
require('./models/Usuario')
    //borramos las tabalas

const Anuncio = mongoose.model('Anuncio');
const Usuario = mongoose.model('Usuario')


const json = require('./anuncios');
const json2 = require('./usuarios')

Anuncio.remove({}, function(err) {
    if (err) return (err);
    console.log("Coleccion de anuncios borrda");

});


Usuario.remove({}, function(err) {
    if (err) return (err);
    console.log("Colleccion de Usuarios eliminada");

});
for (var i = 0; i < json.anuncios.length; i++) {
    var anuncio = new Anuncio(json.anuncios[i]);
    anuncio.save(function(err, anuncioCreado) {
        if (err) throw err;
        console.log('Anuncio ' + anuncioCreado.nombre + ' creado');
    });

}


for (var i = 0; i < json2.usuarios.length; i++) {
    var usuario = new Usuario(json2.usuarios[i]);
    usuario.save(function(err, usuarioCreado) {
        if (err) throw err;
        console.log('Usuario ' + usuarioCreado.nombre + ' creado');
    });

}


//var h = JSON.parse(json.anuncios);

//module.exports = router;