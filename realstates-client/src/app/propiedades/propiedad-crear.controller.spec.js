'use strict';

describe('PropiedadCrearController', function() {
  var propiedadController,
      propiedadService,
      $controller;

  beforeEach(module('app'));

  beforeEach(inject(function(_$controller_, _propiedadService_) {
    $controller = _$controller_;
    propiedadService = _propiedadService_;
  }));

  afterEach(function () {
    $controller = propiedadService = null;
  });

  afterEach(function() {
    $controller = propiedadController = null;
  });

  describe('functions/vars definition', function() {
    beforeEach(function() {
      propiedadController = $controller('PropiedadCrearController', {
        propiedadService: propiedadService
      });
    });

    afterEach(function() {
      propiedadController = null;
    });

    it('should have propiedad defined and it should be a function', function() {
      expect(propiedadController.propiedad).toBeDefined();
    });
  });

});
