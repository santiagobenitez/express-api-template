'use strict';

var mongoose = require('mongoose');

var intereses = ['Semestral', 'Anual'];

var ContratoSchema = new mongoose.Schema({
  fechaDesde: {
    type: Date,
    required: true
  },
  fechaHasta: {
    type: Date,
    required: true
  },
  tipoInteres: {
    type: String,
    enum: intereses
  },
  interes: {
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
  propiedad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'propiedades',
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
  },
  garanteOpcional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clientes'
  },
  propiedadDireccion: String,
  garanteNombreCompleto: String,
  inquilinoNombreCompleto: String
});

module.exports = mongoose.model('contratos', ContratoSchema);
