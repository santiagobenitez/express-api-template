// jshint ignore: start

var pagoRepository = require('../../data/pago.repository');
var pagoService = require('../../services/pago.service');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('pagoService', function() {

  describe('function declaration/definition', function() {
    it('should have create defined', function() {
      expect(pagoService.create).to.exist;
    });
    it('should have getAll defined', function() {
      expect(pagoService.getAll).to.exist;
    });
    it('should have get defined', function() {
      expect(pagoService.get).to.exist;
    });
    it('should have remove defined', function() {
      expect(pagoService.remove).to.exist;
    });
    it('shoud have update defined', function() {
      expect(pagoService.update).to.exist;
    });
  });

  describe('create', function() {

    it('should call create of the pagoRepository with a pago of importe 1000 when it is called with such a pago', function() {
      var pago = {
        importe: 1000
      };
      var mock = sinon.mock(pagoRepository);
      mock.expects('create').withArgs(pago).exactly(1);

      pagoService.create(pago, function(e, obj) {});

      mock.verify();
    });
  });

  describe('getAll', function() {
    afterEach(function() {
      if (pagoRepository.getAll.restore) pagoRepository.getAll.restore();
    });

    it('should call getAll of the pagoRepository when it is called ', function() {

      var mock = sinon.mock(pagoRepository);
      mock.expects('getAll').exactly(1);

      pagoService.getAll(function(e, obj) {});

      mock.verify();
    });

    it('should call the cb function with an error when getAll returns an error', function() {

      var stub = sinon.stub(pagoRepository, 'getAll');
      var error = new Error('unexpected error');
      var inputCallbackSpy = sinon.spy();

      pagoService.getAll(inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[0](error, null);
      expect(inputCallbackSpy.getCall(0).args[0]).to.eql(error);
    });

    it('should call the cb function with the results returned by the repository when there are no errors', function() {

      var stub = sinon.stub(pagoRepository, 'getAll');
      var objs = [{
        _id: '123'
      }];
      var inputCallbackSpy = sinon.spy();

      pagoService.getAll(inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[0](null, objs);
      expect(inputCallbackSpy.getCall(0).args[1]).to.eql(objs);
    });
  });

  describe('get', function() {
    afterEach(function() {
      if (pagoRepository.get.restore) pagoRepository.get.restore();
    });

    it('should call get of the pagoRepository', function() {
      var id = 1;
      var mock = sinon.mock(pagoRepository);
      mock.expects('get').exactly(1).withArgs(id);

      pagoService.get(id, function(e, obj) {});

      mock.verify();
    });

    it('should call the cb function with an error when get returns an error', function() {
      var id = 1;

      var stub = sinon.stub(pagoRepository, 'get');
      var error = new Error('unexpected error');
      var inputCallbackSpy = sinon.spy();

      pagoService.get(id, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[1](error, null);
      expect(inputCallbackSpy.getCall(0).args[0]).to.eql(error);
    });

    it('should call the cb function with the results returned by the repository when there are no errors', function() {
      var id = 1;

      var stub = sinon.stub(pagoRepository, 'get');
      var obj = {
        _id: '123'
      };
      var inputCallbackSpy = sinon.spy();

      pagoService.get(id, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[1](null, obj);
      expect(inputCallbackSpy.getCall(0).args[1]).to.eql(obj);
    });
  });

  describe('remove', function() {
    afterEach(function() {
      if (pagoRepository.remove.restore) pagoRepository.remove.restore();
    });

    it('should call remove of the pagoRepository', function() {
      var id = 1;
      var mock = sinon.mock(pagoRepository);
      mock.expects('remove').exactly(1).withArgs(id);

      pagoService.remove(id, function(e, obj) {});

      mock.verify();
    });

    it('should call the cb function with an error when remove returns an error', function() {
      var id = 1;

      var stub = sinon.stub(pagoRepository, 'remove');
      var error = new Error('unexpected error');
      var inputCallbackSpy = sinon.spy();

      pagoService.remove(id, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[1](error, null);
      expect(inputCallbackSpy.getCall(0).args[0]).to.eql(error);
    });

    it('should call the cb function with a null error when there are no errors while removing the pago', function() {
      var id = 1;

      var stub = sinon.stub(pagoRepository, 'remove');
      var obj = {
        _id: '123'
      };
      var inputCallbackSpy = sinon.spy();

      pagoService.remove(id, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[1](null, obj);
      expect(inputCallbackSpy.getCall(0).args[0]).to.be.null;
    });
  });

  describe('update', function() {
    afterEach(function() {
      if (pagoRepository.update.restore) pagoRepository.update.restore();
    });

    it('should call update of the pagoRepository', function() {
      var id = 1;
      var updatepago = {
        apellido: 'test'
      };
      var mock = sinon.mock(pagoRepository);
      mock.expects('update').exactly(1).withArgs(id, updatepago);

      pagoService.update(id, updatepago, function(e, obj) {});

      mock.verify();
    });

    it('should call the cb function with an error when update returns an error', function() {
      var id = 1;
      var updatepago = {
        apellido: 'test'
      };

      var stub = sinon.stub(pagoRepository, 'update');
      var error = new Error('unexpected error');
      var inputCallbackSpy = sinon.spy();

      pagoService.update(id, updatepago, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[2](error, null);
      expect(inputCallbackSpy.getCall(0).args[0]).to.eql(error);
    });

    it('should call the cb function with the results returned by the repository when there are no errors', function() {
      var id = 1;
      var updatepago = {
        apellido: 'test'
      };

      var stub = sinon.stub(pagoRepository, 'update');
      var updatedpago = {
        apellido: 'test',
        _id: 1
      };
      var inputCallbackSpy = sinon.spy();

      pagoService.update(id, updatepago, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[2](null, updatedpago);
      expect(inputCallbackSpy.getCall(0).args[1]).to.eql(updatedpago);
    });
  });
});
