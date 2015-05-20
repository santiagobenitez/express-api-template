'use strict';

var express = require('express');
var propiedadesRouter = require('./propiedades/propiedades.router');
var rootRouter = require('./root/root.router');

module.exports = function(app) {
  app.use('/', rootRouter);
  app.use('/api/propiedades', propiedadesRouter);
};
