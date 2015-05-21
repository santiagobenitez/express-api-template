var dbUrl = 'mongodb://@127.0.0.1:27017/testbienesraices';
var mongoose = require('mongoose');
var expect = require('chai').expect;
var propiedadesRepository = require('../../data/propiedades.repository');


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
  before(function() {
    mongoose.connect(dbUrl);
  });
  after(function() {
    mongoose.connection.db.dropDatabase();
    mongoose.disconnect();
  });

  describe('function declaratios', function() {
    it('should have create defined', function() {
      expect(propiedadesRepository.create).to.exist;
    });
    it('should have getAll defined', function() {
      expect(propiedadesRepository.getAll).to.exist;
    });
  });

  describe('create', function() {
    it('should create a new propiedad when it is a valid property', function(done) {

      propiedadesRepository.create(newPropiedad, function(e, obj) {
        expect(e).to.be.null;
        expect(obj).to.exist;
        newPropiedad._id = obj._id;
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

      propiedadesRepository.create(newPropiedad, function(e, obj) {
        expect(e).not.to.be.null;
        expect(e.ambientes.message).to.exist;
        done();
      });
    });
  });

  describe('getAll', function() {
    it('should return the recently created propiedad as part of the result', function(done) {

      propiedadesRepository.getAll(function(e, objs) {
        expect(e).to.be.null;
        expect(objs).to.have.length.above(0);
        expect(objs.map(function(item) {
          return item._id
        })).to.contain(newPropiedad._id);
        done();
      });
    });
  });

  describe('get', function() {
    it('should return the recently created propiedad as part of the result', function(done) {

      propiedadesRepository.get(newPropiedad._id, function(e, obj) {
        expect(e).to.be.null;
        expect(obj._id).to.eql(newPropiedad._id);
        done();
      });
    });

    it('should return an error when the id doesnt exist', function(done) {
      propiedadesRepository.get(newPropiedad._id + "a", function(e, obj) {
        expect(e).to.exist;
        done();
      });
    })
  });

});
