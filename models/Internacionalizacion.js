const i18n = require("i18n");

traducir = function(text) {
    i18n.configure({
        locales: ['en', 'de'],
        directory: __dirname + '/locales'
    });
};