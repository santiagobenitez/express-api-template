/*jshint ignore: start */
var expect = require('chai').expect;
var clienteRepository = require('../../data/cliente.repository');
var Promise = require('bluebird');
var mongooseMockHelper = require('./mongoose-mock.helper');
var clientModel = require('../../data/schemas/cliente.model');
var sinon = require('sinon');

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
  describe('create', function() {
		afterEach(function(){
			if (clientModel.create.restore) clientModel.create.restore();
		});
    it('should create a new client when it is a valid client', function(done) {
			var clientModelStub = sinon.stub(clientModel, 'create');
			var clientMock = mongooseMockHelper.getDocMock(newCliente); 
			clientModelStub.returns(Promise.resolve(clientMock));
 
 			clienteRepository.create(newCliente).then(function(obj) {
        expect(obj).to.exist;
        done();
      })
    });

    it('should return an error object when there was an error while creating the user', function(done) {
 			var clientModelStub = sinon.stub(clientModel, 'create');
			clientModelStub.returns(Promise.reject(new Error('error')));

      clienteRepository.create(newCliente).catch(function(e) {
        expect(e).not.to.be.null;
        done();
      });
    });
  });

  describe('getAll', function() {
    afterEach(function(){
			if (clientModel.find.restore) clientModel.find.restore();
		});
		it('should return a fulfilled promise with all of the clients when there are no errors', function(done) {
			var clientModelStub = sinon.stub(clientModel, 'find');
			var queryMock = mongooseMockHelper.getLeanQueryMock(Promise.resolve([{_id: '123'}]));
			clientModelStub.returns(queryMock);

      clienteRepository.getAll().then(function(objs) {
        expect(objs).to.have.length.above(0);
        done();
      });
    });
  });

  describe('get', function() {
		afterEach(function(){
			if (clientModel.findById.restore) clientModel.findById.restore();
		});
    it('should return a fulfilled promise with the client when there are no errors while getting the client', function(done) {
			var clientDoc = mongooseMockHelper.getDocMock({_id: '123'});
      var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(clientDoc));
			var clientStub = sinon.stub(clientModel, 'findById');
			clientStub.returns(queryMock);
			clienteRepository.get('123').then(function(obj) {
        expect(obj._id).to.eql('123');
        done();
      });
    });
    it('should return an error when there was an error while getting the client', function(done) {
      var queryMock = mongooseMockHelper.getQueryMock(Promise.reject(new Error('123')));
			var clientStub = sinon.stub(clientModel, 'findById');
			clientStub.returns(queryMock);
 
			clienteRepository.get('123').catch(function(e) {
        expect(e).to.exist;
        done();
      });
    });

    it('should return null when the id is valid but the object was not found', function(done) {
      var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(null));
			var clientStub = sinon.stub(clientModel, 'findById');
			clientStub.returns(queryMock);
      
			clienteRepository.get('123').then(function(obj) {
        expect(obj).to.be.null;
        done();
      });
    })
  });

  describe('update', function() {
		afterEach(function(){
			if (clientModel.findById.restore) clientModel.findById.restore();
		});
		it('should return the updated client when the client is updated successfully', function(done) {
  		var clientDoc = mongooseMockHelper.getDocMock({apellido: 'testEdit'});
      var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(clientDoc));
			var clientStub = sinon.stub(clientModel, 'findById');
			clientStub.returns(queryMock);
			var clientDocStub = sinon.stub(clientDoc, "save");
			clientDocStub.returns(Promise.resolve(clientDoc));
 
			clienteRepository.update(newCliente._id, newCliente).then(function(obj) {
        expect(obj.apellido).to.eql('testEdit');
        done();
      });
    });

    it('should return an error when there was an error while updating the user', function(done) {
      var queryMock = mongooseMockHelper.getQueryMock(Promise.reject(new Error('error')));
			var clientStub = sinon.stub(clientModel, 'findById');
			clientStub.returns(queryMock);
		
			clienteRepository.update('123', newCliente).catch(function(e) {
        expect(e).to.exist;
        done();
      });
    });
  });

  describe('remove', function() {
		afterEach(function(){
			if (clientModel.findByIdAndRemove.restore) clientModel.findByIdAndRemove.restore();
		});

    it('should return an error when there was an error while removing the client', function(done) {
      var queryMock = mongooseMockHelper.getQueryMock(Promise.reject(new Error('error')));
			var clientStub = sinon.stub(clientModel, 'findByIdAndRemove');
			clientStub.returns(queryMock);
			
			clienteRepository.remove('123').catch(function(e) {
        expect(e).to.exist;
        done();
      });
    })

    it('should return a null error when the recently created cliente was removed successfuly', function(done) {
			var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(null));
			var clientStub = sinon.stub(clientModel, 'findByIdAndRemove');
			clientStub.returns(queryMock);
			
			clienteRepository.remove('123').then(function(e) {
        expect(e).not.to.exist;
        done();
      });
    });
  });
});
