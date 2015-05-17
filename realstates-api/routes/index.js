'use strict';

var express = require('express');
var propiedades = require('./propiedades');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<h1>Hello World</h1>');
});

module.exports = function(app) {
  app.use('/', router);
  app.use('/api/propiedades', propiedades);
};
