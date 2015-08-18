'use strict';

var propiedadesRouter = require('./propiedades/propiedades.router');
var clientesRouter = require('./clientes/cliente.router');
var rootRouter = require('./root/root.router');
var contratoRouter = require('./contratos/contrato.router');
var pagoRouter = require('./pagos/pago.router');
var usuariosRouter = require('./usuarios/usuario.router');

module.exports = function(app) {
  app.use('/', rootRouter);
  app.use('/api/propiedades', propiedadesRouter);
  app.use('/api/clientes', clientesRouter);
  app.use('/api/contratos', contratoRouter);
  app.use('/api/contratos', pagoRouter);
  app.use('/api/usuarios', usuariosRouter);
};
