var dbUrl = 'mongodb://@127.0.0.1:27017/testbienesraices';
var mongoose = require('mongoose');
var expect = require('chai').expect;
var clienteRepository = require('../../data/cliente.repository');


var newCliente = {
  direccion: {
    codigoPostal: '8000',
    direccion: 'Charlone 650',
    ciudad: 'bahia blanca',
    provincia: 'buenos aires',
    pais: 'argentina'
  },
  nombre: 'santiago',
  apellido: 'benitez',
};

describe('clienteRepository', function() {
  before(function() {
    mongoose.connect(dbUrl);
  });
  after(function() {
    mongoose.connection.db.dropDatabase();
    mongoose.disconnect();
  });

  describe('function declaratios', function() {
    it('should have create defined', function() {
      expect(clienteRepository.create).to.exist;
    });
    it('should have getAll defined', function() {
      expect(clienteRepository.getAll).to.exist;
    });
    it('should have get defined', function() {
      expect(clienteRepository.get).to.exist;
    });
    it('should have remove defined', function() {
      expect(clienteRepository.remove).to.exist;
    });
    it('should have update defined', function() {
      expect(clienteRepository.update).to.exist;
    });
  });

  describe('create', function() {
    it('should create a new cliente when it is a valid cliente', function(done) {

      clienteRepository.create(newCliente, function(e, obj) {
        expect(e).to.be.null;
        expect(obj).to.exist;
        newCliente._id = obj._id;
        done();
      })
    });

    it('should return an error object when the appellido property is not specified', function(done) {
      var newCliente = {
        direccion: {
          codigoPostal: '8000',
          direccion: 'Charlone 650',
          ciudad: 'bahia blanca',
          provincia: 'buenos aires',
          pais: 'argentina'
        },
        nombre: 'santiago',
      };

      clienteRepository.create(newCliente, function(e, obj) {
        expect(e).not.to.be.null;
        expect(e.apellido.message).to.exist;
        done();
      });
    });
  });

  describe('getAll', function() {
    it('should return the recently created cliente as part of the result', function(done) {

      clienteRepository.getAll(function(e, objs) {
        expect(e).to.be.null;
        expect(objs).to.have.length.above(0);
        expect(objs.map(function(item) {
          return item._id
        })).to.contain(newCliente._id);
        done();
      });
    });
  });

  describe('get', function() {
    it('should return the recently created cliente as part of the result', function(done) {

      clienteRepository.get(newCliente._id, function(e, obj) {
        expect(e).to.be.null;
        expect(obj._id).to.eql(newCliente._id);
        done();
      });
    });

    it('should return an error when the id doesnt exist', function(done) {
      clienteRepository.get(newCliente._id + "a", function(e, obj) {
        expect(e).to.exist;
        done();
      });
    })
  });

  describe('update', function() {
    it('should update the cliente when the codigoPostal, direccion and apellido are modified', function(done) {
      newCliente.direccion = {
        codigoPostal: '9000',
        direccion: 'Balbin 2325',
        ciudad: 'bahia blanca',
        provincia: 'buenos aires',
        pais: 'argentina'
      };
      newCliente.apellido = 'ostojic';


      clienteRepository.update(newCliente._id, newCliente, function(e, obj) {
        expect(e).to.be.null;
        newCliente = obj;
        expect(newCliente.direccion.direccion).to.eql('Balbin 2325');
        expect(newCliente.direccion.codigoPostal).to.eql('9000');
        expect(newCliente.apellido).to.eql('ostojic');
        done();
      });
    });

    it('should return an error when the id doest exist', function(done) {
      newCliente.direccion = {
        codigoPostal: '8000',
        direccion: 'Balbin 2325',
        ciudad: 'bahia blanca',
        provincia: 'buenos aires',
        pais: 'argentina'
      };

      clienteRepository.update(newCliente._id + 'a', newCliente, function(e, obj) {
        expect(e).to.exist;
        done();
      });
    });
  });

  describe('remove', function() {
    it('should return an error when the object was not removed', function(done) {
      clienteRepository.remove(newCliente._id + "a", function(e) {
        expect(e).to.exist;
        done();
      });
    })

    it('should return a null error when the recently created cliente was removed successfuly', function(done) {
      clienteRepository.remove(newCliente._id, function(e) {
        expect(e).to.be.null;
        done();
      });
    });
  });

});
