'use strict';

var propiedadesRouter = require('./propiedades/propiedades.router');
var clientesRouter = require('./clientes/cliente.router');
var rootRouter = require('./root/root.router');

module.exports = function(app) {
  app.use('/', rootRouter);
  app.use('/api/propiedades', propiedadesRouter);
  app.use('/api/clientes', clientesRouter);
};
