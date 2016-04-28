'use strict';

var contratoService = require('../../services/contrato.service');
var logger = require('../../helpers/logger');

function getAll(req, res, next) {
  contratoService.getAll().then(function(objs) {
    res.status(200).json({
      items: objs
    });
  }).catch(function(e){
		next(e);
	});
}

function post(req, res, next) {
  contratoService.create(req.body).then(function(obj) {
    res.status(200).json({
      _id: obj._id
    });

    logger.info({res: res}, 'Creacion exitosa del contrato: %s', obj._id);
  }).catch(function(e){
		next(e);
	});
}

function get(req, res, next) {
  contratoService.get(req.params.id).then(function(obj) {
    if (!obj) {
      var error = new Error('not found');
      error.status = 404;
      return next(error);
    }
    res.status(200).json(obj);
  }).catch(function(e){
		next(e);
	});
}

function remove(req, res, next) {
  contratoService.remove(req.params.id).then(function() {
    res.status(200).end();

    logger.info({res: res}, 'Eliminacion exitosa del contrato: %s', req.params.id);
  }).catch(function(e){
		next(e);
	});
}

function update(req, res, next) {
  delete req.body._id;
  contratoService.update(req.params.id, req.body).then(function(obj) {
    res.status(200).json(obj);
    logger.info({res: res, updatedObj: obj}, 'Actualizacion exitosa del contrato: %s', obj._id);
  }).catch(function(e){
		next(e);
	});
}

module.exports = {
  post: post,
  getAll: getAll,
  get: get,
  remove: remove,
  update: update
};
