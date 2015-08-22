'use strict';

describe('pagoService', function() {
  var pagoService,
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
    beforeEach(inject(function(_pagoService_) {
      pagoService = _pagoService_;
    }));
    afterEach(function() {
      pagoService = null;
    });

    it('should have get defined', function() {
      expect(pagoService.get).toBeDefined();
    });

    it('should have getAll defined', function() {
      expect(pagoService.getAll).toBeDefined();
    });

    it('should have create defined', function() {
      expect(pagoService.create).toBeDefined();
    });
    it('should have update defined', function() {
      expect(pagoService.update).toBeDefined();
    });
    it('should have remove defined', function() {
      expect(pagoService.remove).toBeDefined();
    });

  });

  describe('getAll', function() {
    beforeEach(inject(function(_pagoService_) {
      pagoService = _pagoService_;
      spyOn($state, 'go').and.callFake(function() {});

    }));
    afterEach(function() {
      pagoService = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it("should return an empty array when there are no pagos", function() {
      //arrange
      var fakePagos = {
        items: []
      };
      var _clientes;
      $httpBackend.whenGET(urlConstants.api + 'contratos/1/pagos').respond(fakePagos);
      //act
      pagoService.getAll(1).then(function(pagos) {
        _clientes = pagos;
      });
      $httpBackend.flush();
      //assert
      expect(_clientes.length).toBe(0);
    });

    it("should return a pago when there is one pago", function() {
      //arrange
      var fakePagos = {
        items: [{
          _id: '123'
        }]
      };
      var _clientes;
      $httpBackend.whenGET(urlConstants.api + 'contratos/1/pagos').respond(fakePagos);
      //act
      pagoService.getAll(1).then(function(pagos) {
        _clientes = pagos;
      });
      $httpBackend.flush();
      //assert
      expect(_clientes.length).toBe(1);
      expect(_clientes[0]._id).toBe('123');
    });


    it("should return an error msg when there was an error while processing the getAll", function() {
      //arrange

      var _error;
      $httpBackend.whenGET(urlConstants.api + 'contratos/1/pagos').respond(400, {
        message: 'unexpected error'
      });
      //act
      pagoService.getAll(1).then(null, function(err) {
        _error = err;
      });
      $httpBackend.flush();
      //assert
      expect(_error).toBe('unexpected error');
    });

  });

  describe('create', function() {
    beforeEach(inject(function(_pagoService_) {
      pagoService = _pagoService_;
      spyOn($state, 'go').and.callFake(function() {});

    }));
    afterEach(function() {
      pagoService = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });


    it("should return a pagoId when a pago was created successfully", function() {
      //arrange
      var fakePago = {
        _id: '123'
      };

      var _pagoId;
      $httpBackend.whenPOST(urlConstants.api + 'contratos/1/pagos').respond(fakePago);
      //act
      pagoService.create({
        contrato: 1
      }).then(function(pagoId) {
        _pagoId = pagoId;
      });
      $httpBackend.flush();
      //assert
      expect(_pagoId).toBe('123');
    });


    it("should return an error msg when there was an error while processing the create", function() {
      //arrange
      var _error;
      $httpBackend.whenPOST(urlConstants.api + 'contratos/1/pagos').respond(400, {
        message: 'unexpected error'
      });
      //act
      pagoService.create({
        contrato: 1
      }).then(null, function(err) {
        _error = err;
      });
      $httpBackend.flush();
      //assert
      expect(_error).toBe('unexpected error');
    });

  });

  describe('get', function() {

    beforeEach(inject(function(_pagoService_) {
      pagoService = _pagoService_;
      spyOn($state, 'go').and.callFake(function() {});

    }));

    afterEach(function() {
      pagoService = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });


    it("should return a pago when a pago was found successfully", function() {
      //arrange
      var fakePago = {
        _id: '1'
      };

      var _pago;
      $httpBackend.whenGET(urlConstants.api + 'contratos/1/pagos/2').respond(fakePago);
      //act
      pagoService.get(1, 2).then(function(pago) {
        _pago = pago;
      });
      $httpBackend.flush();
      //assert
      expect(_pago._id).toBe('1');
    });


    it("should return an error msg when there was an error while processing the get of a pago", function() {
      //arrange
      var _error;
      $httpBackend.whenGET(urlConstants.api + 'contratos/1/pagos/2').respond(400, {
        message: 'unexpected error'
      });
      //act
      pagoService.get(1, 2).then(null, function(err) {
        _error = err;
      });
      $httpBackend.flush();
      //assert
      expect(_error).toBe('unexpected error');
    });

  });

  describe('update', function() {
    beforeEach(inject(function(_pagoService_) {
      pagoService = _pagoService_;
      spyOn($state, 'go').and.callFake(function() {});

    }));
    afterEach(function() {
      pagoService = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });


    it("should return a pago when a pago was updated successfully", function() {
      //arrange
      var pagoToUpdate = {
        _id: '1',
        contrato: '2'
      };

      var _pago;
      $httpBackend.whenPUT(urlConstants.api + 'contratos/2/pagos/1').respond(pagoToUpdate);
      //act
      pagoService.update(pagoToUpdate).then(function(pago) {
        _pago = pago;
      });
      $httpBackend.flush();
      //assert
      expect(_pago._id).toBe('1');
    });


    it("should return an error msg when there was an error while updating the pago", function() {
      //arrange
      var pagoToUpdate = {
        _id: '1',
        contrato: '2'
      };

      var _error;
      $httpBackend.whenPUT(urlConstants.api + 'contratos/2/pagos/1').respond(400, {
        message: 'unexpected error'
      });
      //act
      pagoService.update(pagoToUpdate).then(null, function(err) {
        _error = err;
      });
      $httpBackend.flush();
      //assert
      expect(_error).toBe('unexpected error');
    });

  });

  describe('remove', function() {

    beforeEach(inject(function(_pagoService_) {
      pagoService = _pagoService_;
      spyOn($state, 'go').and.callFake(function() {});

    }));

    afterEach(function() {
      pagoService = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });


    it("should return an empty object when a pago was removed successfully", function() {
      //arrange
      var fakePago = {
        removed: true
      };

      var _pago;
      $httpBackend.whenDELETE(urlConstants.api + 'contratos/1/pagos/2').respond(fakePago);
      //act
      pagoService.remove(1, 2).then(function(pago) {
        _pago = pago;
      });
      $httpBackend.flush();
      //assert
      expect(_pago.removed).toBeTruthy();
    });


    it("should return an error msg when there was an error while processing the get of a pago", function() {
      //arrange
      var _error;
      $httpBackend.whenDELETE(urlConstants.api + 'contratos/1/pagos/2').respond(400, {
        message: 'unexpected error'
      });
      //act
      pagoService.remove(1, 2).then(null, function(err) {
        _error = err;
      });
      $httpBackend.flush();
      //assert
      expect(_error).toBe('unexpected error');
    });

  });
});
