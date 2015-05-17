'use strict';

describe('PropiedadDetalleController', function() {
  var propiedadController;
  var $controller;

  beforeEach(module('app'));
  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));
  afterEach(function() {
    $controller = propiedadController = null;
  });
  describe('functions/vars definition', function() {
    beforeEach(function() {
      propiedadController = $controller('PropiedadDetalleController', {
        propiedad: {}
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
