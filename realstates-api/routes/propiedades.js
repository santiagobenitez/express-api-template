'use strict';

var express = require('express');
var router = express.Router();
var propiedadesService = require('../services/propiedadesService');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  propiedadesService.crear(req.body, function(e, obj) {
    if (!e) { return next(e); }

    return res.status(200).json({id: obj._id});
  });
});

module.exports = router;
