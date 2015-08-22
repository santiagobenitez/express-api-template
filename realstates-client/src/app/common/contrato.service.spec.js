'use strict';

describe('contratoService', function() {
  var contratoService,
    $httpBackend,
    urlConstants,
    $state;

  beforeEach(module('app'));

  beforeEach(inject(function(_$httpBackend_, _URL_, _$state_) {
    $httpBackend = _$httpBackend_;
    urlConstants = _URL_;
    $state = _$state_;
  }));

  afterEach(function() {
    $httpBackend = urlConstants = null;
  });

  describe('function definitios', function() {
    beforeEach(inject(function(_contratoService_) {
      contratoService = _contratoService_;
    }));
    afterEach(function() {
      contratoService = null;
    });

    it('should have get defined', function() {
      expect(contratoService.get).toBeDefined();
    });

    it('should have getAll defined', function() {
      expect(contratoService.getAll).toBeDefined();
    });

    it('should have create defined', function() {
      expect(contratoService.create).toBeDefined();
    });
    it('should have update defined', function() {
      expect(contratoService.update).toBeDefined();
    });
  });

  describe('getAll', function() {
    beforeEach(inject(function(_contratoService_) {
      contratoService = _contratoService_;
      spyOn($state, 'go').and.callFake(function() {});

    }));
    afterEach(function() {
      contratoService = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it("should return an empty array when there are no contratos", function() {
      //arrange
      var fakeContratos = {
        items: []
      };
      var _clientes;
      $httpBackend.whenGET(urlConstants.api + 'contratos').respond(fakeContratos);
      //act
      contratoService.getAll().then(function(contratos) {
        _clientes = contratos;
      });
      $httpBackend.flush();
      //assert
      expect(_clientes.length).toBe(0);
    });

    it("should return a cliente when there is one cliente", function() {
      //arrange
      var fakeContratos = {
        items: [{
          _id: '123'
        }]
      };
      var _clientes;
      $httpBackend.whenGET(urlConstants.api + 'contratos').respond(fakeContratos);
      //act
      contratoService.getAll().then(function(contratos) {
        _clientes = contratos;
      });
      $httpBackend.flush();
      //assert
      expect(_clientes.length).toBe(1);
      expect(_clientes[0]._id).toBe('123');
    });


    it("should return an error msg when there was an error while processing the getAll", function() {
      //arrange

      var _error;
      $httpBackend.whenGET(urlConstants.api + 'contratos').respond(400, {
        message: 'unexpected error'
      });
      //act
      contratoService.getAll().then(null, function(err) {
        _error = err;
      });
      $httpBackend.flush();
      //assert
      expect(_error).toBe('unexpected error');
    });

  });

  describe('create', function() {
    beforeEach(inject(function(_contratoService_) {
      contratoService = _contratoService_;
      spyOn($state, 'go').and.callFake(function() {});

    }));
    afterEach(function() {
      contratoService = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });


    it("should return a contratoid when a contrato was created successfully", function() {
      //arrange
      var fakecontrato = {
        _id: '123'
      };

      var _contratoId;
      $httpBackend.whenPOST(urlConstants.api + 'contratos').respond(fakecontrato);
      //act
      contratoService.create({}).then(function(contratoId) {
        _contratoId = contratoId;
      });
      $httpBackend.flush();
      //assert
      expect(_contratoId).toBe('123');
    });


    it("should return an error msg when there was an error while processing the getAll", function() {
      //arrange
      var _error;
      $httpBackend.whenPOST(urlConstants.api + 'contratos').respond(400, {
        message: 'unexpected error'
      });
      //act
      contratoService.create({}).then(null, function(err) {
        _error = err;
      });
      $httpBackend.flush();
      //assert
      expect(_error).toBe('unexpected error');
    });

  });

  describe('get', function() {
    beforeEach(inject(function(_contratoService_) {
      contratoService = _contratoService_;
      spyOn($state, 'go').and.callFake(function() {});

    }));
    afterEach(function() {
      contratoService = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });


    it("should return a client when a cliente was found successfully", function() {
      //arrange
      var fakeCliente = {
        _id: '1'
      };

      var _cliente;
      $httpBackend.whenGET(urlConstants.api + 'contratos/1').respond(fakeCliente);
      //act
      contratoService.get('1').then(function(cliente) {
        _cliente = cliente;
      });
      $httpBackend.flush();
      //assert
      expect(_cliente._id).toBe('1');
    });


    it("should return an error msg when there was an error while processing the getAll", function() {
      //arrange
      var _error;
      $httpBackend.whenGET(urlConstants.api + 'contratos/1').respond(400, {
        message: 'unexpected error'
      });
      //act
      contratoService.get('1').then(null, function(err) {
        _error = err;
      });
      $httpBackend.flush();
      //assert
      expect(_error).toBe('unexpected error');
    });

  });

  describe('update', function() {
    beforeEach(inject(function(_contratoService_) {
      contratoService = _contratoService_;
      spyOn($state, 'go').and.callFake(function() {});

    }));
    afterEach(function() {
      contratoService = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });


    it("should return a client when a cliente was updated successfully", function() {
      //arrange
      var clienteToUpdate = {
        _id: '1'
      };

      var _cliente;
      $httpBackend.whenPUT(urlConstants.api + 'contratos/1').respond(clienteToUpdate);
      //act
      contratoService.update(clienteToUpdate).then(function(cliente) {
        _cliente = cliente;
      });
      $httpBackend.flush();
      //assert
      expect(_cliente._id).toBe('1');
    });


    it("should return an error msg when there was an error while updating the cliente", function() {
      //arrange
      var clienteToUpdate = {
        _id: '1'
      };
      var _error;
      $httpBackend.whenPUT(urlConstants.api + 'contratos/1').respond(400, {
        message: 'unexpected error'
      });
      //act
      contratoService.update(clienteToUpdate).then(null, function(err) {
        _error = err;
      });
      $httpBackend.flush();
      //assert
      expect(_error).toBe('unexpected error');
    });

  });
});
