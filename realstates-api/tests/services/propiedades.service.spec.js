// jshint ignore: start

var propiedadesRepository = require('../../data/propiedades.repository');
var propiedadesService = require('../../services/propiedades.service');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('propiedadesService', function() {

  describe('function declaration/definition', function() {
    it('should have create defined', function() {
      expect(propiedadesService.create).to.exist;
    });
    it('should have getAll defined', function() {
      expect(propiedadesService.getAll).to.exist;
    });
  });

  describe('create', function() {

    it('should call create of the propiedadesRepository with a propiedad of two ambientes when it is called with such a propiedad', function() {
      var propiedad = {
        ambientes: 2
      };
      var mock = sinon.mock(propiedadesRepository);
      mock.expects('create').withArgs(propiedad).exactly(1);

      propiedadesService.create(propiedad, function(e, obj) {});

      mock.verify();
    });
  });

  describe('getAll', function() {
    afterEach(function() {
      if (propiedadesRepository.getAll.restore) propiedadesRepository.getAll.restore();
    });

    it('should call getAll of the propiedadesRepository when it is called ', function() {

      var mock = sinon.mock(propiedadesRepository);
      mock.expects('getAll').exactly(1);

      propiedadesService.getAll(function(e, obj) {});

      mock.verify();
    });

    it('should call the cb function with an error when getAll returns an error', function() {

      var stub = sinon.stub(propiedadesRepository, 'getAll');
      var error = new Error('unexpected error');
      var inputCallbackSpy = sinon.spy();

      propiedadesService.getAll(inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[0](error, null);
      expect(inputCallbackSpy.getCall(0).args[0]).to.eql(error);
    });

    it('should call the cb function with the results returned by the repository when there are no errors', function() {

      var stub = sinon.stub(propiedadesRepository, 'getAll');
      var objs = [{
        _id: '123'
      }];
      var inputCallbackSpy = sinon.spy();

      propiedadesService.getAll(inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[0](null, objs);
      expect(inputCallbackSpy.getCall(0).args[1]).to.eql(objs);
    });
  });

  describe('get', function() {
    afterEach(function() {
      if (propiedadesRepository.get.restore) propiedadesRepository.get.restore();
    });

    it('should call get of the propiedadesRepository', function() {
      var id = 1;
      var mock = sinon.mock(propiedadesRepository);
      mock.expects('get').exactly(1).withArgs(id);

      propiedadesService.get(id, function(e, obj) {});

      mock.verify();
    });

    it('should call the cb function with an error when get returns an error', function() {
      var id = 1;

      var stub = sinon.stub(propiedadesRepository, 'get');
      var error = new Error('unexpected error');
      var inputCallbackSpy = sinon.spy();

      propiedadesService.get(id, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[1](error, null);
      expect(inputCallbackSpy.getCall(0).args[0]).to.eql(error);
    });

    it('should call the cb function with the results returned by the repository when there are no errors', function() {
      var id = 1;

      var stub = sinon.stub(propiedadesRepository, 'get');
      var obj = {
        _id: '123'
      };
      var inputCallbackSpy = sinon.spy();

      propiedadesService.get(id, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[1](null, obj);
      expect(inputCallbackSpy.getCall(0).args[1]).to.eql(obj);
    });
  });

  describe('update', function() {
    afterEach(function() {
      if (propiedadesRepository.update.restore) propiedadesRepository.update.restore();
    });

    it('should call update of the propiedadesRepository', function() {
      var id = 1;
      var updatePropiedad = {
        ambientes: 1
      };
      var mock = sinon.mock(propiedadesRepository);
      mock.expects('update').exactly(1).withArgs(id, updatePropiedad);

      propiedadesService.update(id, updatePropiedad, function(e, obj) {});

      mock.verify();
    });

    it('should call the cb function with an error when update returns an error', function() {
      var id = 1;
      var updatePropiedad = {
        ambientes: 1
      };

      var stub = sinon.stub(propiedadesRepository, 'update');
      var error = new Error('unexpected error');
      var inputCallbackSpy = sinon.spy();

      propiedadesService.update(id, updatePropiedad, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[2](error, null);
      expect(inputCallbackSpy.getCall(0).args[0]).to.eql(error);
    });

    it('should call the cb function with the results returned by the repository when there are no errors', function() {
      var id = 1;
      var updatePropiedad = {
        ambientes: 1
      };

      var stub = sinon.stub(propiedadesRepository, 'update');
      var updatedPropiedad = {
        ambientes: 1,
        _id: 1
      };
      var inputCallbackSpy = sinon.spy();

      propiedadesService.update(id, updatePropiedad, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[2](null, updatedPropiedad);
      expect(inputCallbackSpy.getCall(0).args[1]).to.eql(updatedPropiedad);
    });
  });

  describe('remove', function() {
    afterEach(function() {
      if (propiedadesRepository.remove.restore) propiedadesRepository.remove.restore();
    });

    it('should call remove of the propiedadesRepository', function() {
      var id = 1;
      var mock = sinon.mock(propiedadesRepository);
      mock.expects('remove').exactly(1).withArgs(id);

      propiedadesService.remove(id, function(e, obj) {});

      mock.verify();
    });

    it('should call the cb function with an error when remove returns an error', function() {
      var id = 1;

      var stub = sinon.stub(propiedadesRepository, 'remove');
      var error = new Error('unexpected error');
      var inputCallbackSpy = sinon.spy();

      propiedadesService.remove(id, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[1](error, null);
      expect(inputCallbackSpy.getCall(0).args[0]).to.eql(error);
    });

    it('should call the cb function with a null error when there are no errors while removing the propiedada', function() {
      var id = 1;

      var stub = sinon.stub(propiedadesRepository, 'remove');
      var obj = {
        _id: '123'
      };
      var inputCallbackSpy = sinon.spy();

      propiedadesService.remove(id, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[1](null, obj);
      expect(inputCallbackSpy.getCall(0).args[0]).to.be.null;
    });
  });
});
