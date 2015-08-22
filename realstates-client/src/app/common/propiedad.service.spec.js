'use strict';

describe('propiedadService', function() {
  var propiedadService,
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
    beforeEach(inject(function(_propiedadService_) {
      propiedadService = _propiedadService_;
    }));
    afterEach(function() {
      propiedadService = null;
    });

    it('should have get defined', function() {
      expect(propiedadService.get).toBeDefined();
    });

    it('should have getAll defined', function() {
      expect(propiedadService.getAll).toBeDefined();
    });

    it('should have create defined', function() {
      expect(propiedadService.create).toBeDefined();
    });

    it('should have update defined', function() {
      expect(propiedadService.update).toBeDefined();
    });

  });

  describe('getAll', function() {
    beforeEach(inject(function(_propiedadService_) {
      propiedadService = _propiedadService_;
      spyOn($state, 'go').and.callFake(function() {});

    }));
    afterEach(function() {
      propiedadService = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it("should return an empty array when there are no propiedades", function() {
      //arrange
      var fakePropiedades = {
        items: []
      };
      var _propiedades;
      $httpBackend.whenGET(urlConstants.api + 'propiedades').respond(fakePropiedades);
      //act
      propiedadService.getAll().then(function(propiedades) {
        _propiedades = propiedades;
      });
      $httpBackend.flush();
      //assert
      expect(_propiedades.length).toBe(0);
    });

    it("should return a propiedad when there is one propiedad", function() {
      //arrange
      var fakePropiedades = {
        items: [{
          _id: '123'
        }]
      };
      var _propiedades;
      $httpBackend.whenGET(urlConstants.api + 'propiedades').respond(fakePropiedades);
      //act
      propiedadService.getAll().then(function(propiedades) {
        _propiedades = propiedades;
      });
      $httpBackend.flush();
      //assert
      expect(_propiedades.length).toBe(1);
      expect(_propiedades[0]._id).toBe('123');
    });


    it("should return an error msg when there was an error while processing the getAll", function() {

      var _error;
      $httpBackend.whenGET(urlConstants.api + 'propiedades').respond(400, {
        message: 'unexpected error'
      });
      //act
      propiedadService.getAll().then(null, function(err) {
        _error = err;
      });
      $httpBackend.flush();
      //assert
      expect(_error.message).toBe('unexpected error');
    });

  });

  describe('get', function() {
    beforeEach(inject(function(_propiedadService_) {
      propiedadService = _propiedadService_;
      spyOn($state, 'go').and.callFake(function() {});

    }));
    afterEach(function() {
      propiedadService = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });


    it("should return a propiedad when a propiedad was found successfully", function() {
      //arrange
      var fakePropiedad = {
        _id: '1'
      };

      var _propiedad;
      $httpBackend.whenGET(urlConstants.api + 'propiedades/1').respond(fakePropiedad);
      //act
      propiedadService.get('1').then(function(propiedad) {
        _propiedad = propiedad;
      });
      $httpBackend.flush();
      //assert
      expect(_propiedad._id).toBe('1');
    });


    it("should return an error msg when there was an error while processing the getAll", function() {
      //arrange
      var _error;
      $httpBackend.whenGET(urlConstants.api + 'propiedades/1').respond(400, {
        message: 'unexpected error'
      });
      //act
      propiedadService.get('1').then(null, function(err) {
        _error = err;
      });
      $httpBackend.flush();
      //assert
      expect(_error).toBe('unexpected error');
    });

  });

  describe('create', function() {
    beforeEach(inject(function(_propiedadService_) {
      propiedadService = _propiedadService_;
      spyOn($state, 'go').and.callFake(function() {});

    }));
    afterEach(function() {
      propiedadService = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });


    it("should return a propiedad id when a propiedad was created successfully", function() {
      //arrange
      var fakePropiedad = {
        _id: '123'
      };

      var _fakePropiedadId;
      $httpBackend.whenPOST(urlConstants.api + 'propiedades').respond(fakePropiedad);
      //act
      propiedadService.create({}).then(function(propiedadId) {
        _fakePropiedadId = propiedadId;
      });
      $httpBackend.flush();
      //assert
      expect(_fakePropiedadId).toBe('123');
    });


    it("should return an error msg when there was an error while processing the create", function() {
      //arrange
      var _error;
      $httpBackend.whenPOST(urlConstants.api + 'propiedades').respond(400, {
        message: 'unexpected error'
      });
      //act
      propiedadService.create({}).then(null, function(err) {
        _error = err;
      });
      $httpBackend.flush();
      //assert
      expect(_error).toBe('unexpected error');
    });

  });

  describe('update', function() {
    beforeEach(inject(function(_propiedadService_) {
      propiedadService = _propiedadService_;
      spyOn($state, 'go').and.callFake(function() {});

    }));
    afterEach(function() {
      propiedadService = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });


    it("should return a client when a cliente was updated successfully", function() {
      //arrange
      var propiedadToUpdate = {
        _id: '1'
      };

      var _propiedad;
      $httpBackend.whenPUT(urlConstants.api + 'propiedades/1').respond(propiedadToUpdate);
      //act
      propiedadService.update(propiedadToUpdate).then(function(cliente) {
        _propiedad = cliente;
      });
      $httpBackend.flush();
      //assert
      expect(_propiedad._id).toBe('1');
    });


    it("should return an error msg when there was an error while updating the cliente", function() {
      //arrange
      var propiedadToUpdate = {
        _id: '1'
      };
      var _error;
      $httpBackend.whenPUT(urlConstants.api + 'propiedades/1').respond(400, {
        message: 'unexpected error'
      });
      //act
      propiedadService.update(propiedadToUpdate).then(null, function(err) {
        _error = err;
      });
      $httpBackend.flush();
      //assert
      expect(_error).toBe('unexpected error');
    });

  });

});
