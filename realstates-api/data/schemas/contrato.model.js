'use strict';

var mongoose = require('mongoose');

var intereses = ['Semestral', 'Anual'];

var ContratoSchema = new mongoose.Schema({
  propiedad:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'propiedades',
    required: true
  },
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaFin: {
    type: Date,
    required: true
  },
  tipoInteres: {
    type: String,
    enum: intereses,
    required: true
  },
  porcentajeInteres: {
    type: Number,
    required: true
  },
  alquiler: {
    type: Number,
    required: true
  },
  deposito: {
    type: Number,
    required: true
  },
  multaDiaria: {
    type: Number,
    required: true
  },
  inquilino: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clientes',
    required: true
  },
  garante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clientes',
    required: true
  }
});

module.exports = mongoose.model('contratos', ContratoSchema);
