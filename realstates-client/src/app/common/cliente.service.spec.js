'use strict';

describe('clienteService', function() {
  var clienteService,
    $httpBackend,
    urlConstants;

  beforeEach(module('app'));

  beforeEach(inject(function(_$httpBackend_, _URL_) {
    $httpBackend = _$httpBackend_;
    urlConstants = _URL_;
  }));

  afterEach(function() {
    $httpBackend = urlConstants = null;
  });

  describe('function definitios', function() {
    beforeEach(inject(function(_clienteService_) {
      clienteService = _clienteService_;
    }));
    afterEach(function() {
      clienteService = null;
    });

    it('should have get defined', function() {
      expect(clienteService.get).toBeDefined();
    });

    it('should have getAll defined', function() {
      expect(clienteService.getAll).toBeDefined();
    });

  });

  describe('getAll', function() {
    beforeEach(inject(function(_clienteService_) {
      clienteService = _clienteService_;
    }));
    afterEach(function() {
      clienteService = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it("should return an empty array when there are no clientes", function() {
      //arrange
      var fakeClientes = [];
      var _clientes;
      $httpBackend.whenGET(urlConstants.api + 'clientes').respond(fakeClientes);
      //act
      clienteService.getAll().then(function(clientes) {
        _clientes = clientes;
      });
      $httpBackend.flush();
      //assert
      expect(_clientes.length).toBe(0);
    });

    it("should return a cliente when there is one cliente", function() {
      //arrange
      var fakeClientes = [{
        _id: '123'
      }];
      var _clientes;
      $httpBackend.whenGET(urlConstants.api + 'clientes').respond(fakeClientes);
      //act
      clienteService.getAll().then(function(clientes) {
        _clientes = clientes;
      });
      $httpBackend.flush();
      //assert
      expect(_clientes.length).toBe(1);
      expect(_clientes[0]._id).toBe('123');
    });


    it("should return an error msg when there was an error while processing the getAll", function() {
      //arrange
      var fakeClientes = [{
        _id: '123'
      }];
      var _error;
      $httpBackend.whenGET(urlConstants.api + 'clientes').respond(400, {
        message: 'unexpected error'
      });
      //act
      clienteService.getAll().then(null, function(err) {
        _error = err;
      });
      $httpBackend.flush();
      //assert
      expect(_error.message).toBe('unexpected error');
    });

  });
});
