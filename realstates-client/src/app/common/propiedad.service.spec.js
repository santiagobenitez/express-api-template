'use strict';

describe('propiedadService', function() {
  var propiedadService;

  beforeEach(module('app'));

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
  });
});
