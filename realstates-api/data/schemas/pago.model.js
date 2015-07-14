'use strict';

var mongoose = require('mongoose');

var PagoSchema = new mongoose.Schema({
  realizadoPor: String,
  importe: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  contrato: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'contratos',
    required: true
  },
  fechaCreacion: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('pagos', PagoSchema);
