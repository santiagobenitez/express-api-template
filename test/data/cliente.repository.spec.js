/*jshint ignore: start */
var dbUrl = 'mongodb://@127.0.0.1:27017/test';
var mongoose = require('mongoose');
var expect = require('chai').expect;
var clienteRepository = require('../../data/cliente.repository');
var mockgoose = require('mockgoose');
mongoose.Promise = require('bluebird');

var newCliente = {
  direccion: {
    codigoPostal: '8000',
    direccion: 'test address',
    ciudad: 'test city',
    provincia: 'test province',
    pais: 'country'
  },
  nombre: 'name',
  apellido: 'last name',
};

describe('clienteRepository', function() {
	before(function(done) {
		mockgoose(mongoose).then(function(){
			mongoose.connect(dbUrl, function(err){
				done();
			});
		});
	});
	after(function(done) {
		mockgoose.reset(function(){
			done();
		});
	});

  describe('create', function() {
    it('should create a new client when it is a valid client', function(done) {

      clienteRepository.create(newCliente).then(function(obj) {
        expect(obj).to.exist;
        newCliente._id = obj._id;
        done();
      })
    });

    it('should return an error object when the last name is not specified', function(done) {
      var newCliente = {
        direccion: {
          codigoPostal: '8000',
          direccion: 'new address',
          ciudad: 'new city',
          provincia: 'new province',
          pais: 'new country'
        },
        nombre: 'new name',
      };

      clienteRepository.create(newCliente).catch(function(e) {
        expect(e).not.to.be.null;
        expect(e.errors.apellido.message).to.exist;
        done();
      });
    });
  });

  describe('getAll', function() {
    it('should return the recently created client as part of the result', function(done) {
      clienteRepository.getAll().then(function(objs) {
        expect(objs).to.have.length.above(0);
        expect(objs.map(function(item) {
          return item._id
        })).to.contain(newCliente._id);
        done();
      });
    });
  });

  describe('get', function() {
    it('should return the recently created client as part of the result', function(done) {
      clienteRepository.get(newCliente._id).then(function(obj) {
        expect(obj._id).to.eql(newCliente._id);
        done();
      });
    });
    it('should return an error when the id is invalid', function(done) {
      clienteRepository.get(newCliente._id + "a").catch(function(e) {
        expect(e).to.exist;
        done();
      });
    });

    it('should return null when the id is valid but the object was not found', function(done) {
      // 556c217f3bb8bc6017a8f2e8
      clienteRepository.get('556c217f3bb8bc6017a8f2e5').then(function(obj) {
        expect(obj).to.be.null;
        done();
      });
    })
  });

  describe('update', function() {
    it('should update the cliente when the postal code, address and last name  are modified', function(done) {
      newCliente.direccion = {
        codigoPostal: '9000',
        direccion: 'updated address',
        ciudad: 'updated city',
        provincia: 'updated province',
        pais: 'updated country'
      };
      newCliente.apellido = 'updated last name';

      clienteRepository.update(newCliente._id, newCliente).then(function(obj) {
        newCliente = obj;
        expect(newCliente.direccion.direccion).to.eql('updated address');
        expect(newCliente.direccion.codigoPostal).to.eql('9000');
        expect(newCliente.apellido).to.eql('updated last name');
        done();
      });
    });

    it('should return an error when the id doest exist', function(done) {
      clienteRepository.update(newCliente._id + 'a', newCliente).catch(function(e) {
        expect(e).to.exist;
        done();
      });
    });
  });

  describe('remove', function() {
    it('should return an error when the object was not removed', function(done) {
      clienteRepository.remove(newCliente._id + "a").catch(function(e) {
        expect(e).to.exist;
        done();
      });
    })

    it('should return a null error when the recently created cliente was removed successfuly', function(done) {
      clienteRepository.remove(newCliente._id).then(function(e) {
        expect(e).not.to.exist;
        done();
      });
    });
  });
});
