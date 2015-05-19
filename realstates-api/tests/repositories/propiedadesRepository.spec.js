var dbUrl = 'mongodb://@127.0.0.1:27017/testbienesraices';
var mongoose = require('mongoose');
var expect = require('chai').expect;
mongoose.connect(dbUrl);
require('../../models')();
var propiedadesRepository = require('../../repositories/propiedadesRepository');


var newPropiedad = {
  direccion: {
    codigoPostal: '8000',
    direccion: 'Charlone 650',
    ciudad: 'bahia blanca',
    provincia: 'buenos aires',
    pais: 'argentina'
  },
  ambientes: 1,
  banios: 1,
  expensas: 1,
  metrosCuadrados: 1,
};

describe('propiedadesRepository', function() {


  describe('function declaratios', function() {
    it('should have crear defined', function() {
      expect(propiedadesRepository.crear).to.exist;
    });
  });

  describe('crear', function() {
    it('should create a new propiedad when it is a valid property', function(done) {

      propiedadesRepository.crear(newPropiedad, function(e, obj) {
        expect(e).to.be.null;
        expect(obj).to.exist;
        done();
      })
    });

    it('should return an error object when the ambientes property is not specified', function(done) {
      var newPropiedad = {
        direccion: {
          codigoPostal: '8000',
          direccion: 'Charlone 650',
          ciudad: 'bahia blanca',
          provincia: 'buenos aires',
          pais: 'argentina'
        },
        expensas: 1,
        metrosCuadrados: 1,
      };

      propiedadesRepository.crear(newPropiedad, function(e, obj) {
        expect(e).not.to.be.null;
        expect(e.ambientes.message).to.exist;
        done();
      })
    });
  });

});
