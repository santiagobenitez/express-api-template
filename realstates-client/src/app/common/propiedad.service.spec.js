'use strict';

describe('propiedadService', function() {
  var propiedadService,
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

  });

  describe('getAll', function() {
    beforeEach(inject(function(_propiedadService_) {
      propiedadService = _propiedadService_;
    }));
    afterEach(function() {
      propiedadService = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it("should return an empty array when there are no propiedades", function() {
      //arrange
      var fakePropiedades = [];
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
      var fakePropiedades = [{
        _id: '123'
      }];
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
      //arrange
      var fakePropiedades = [{
        _id: '123'
      }];
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
});
