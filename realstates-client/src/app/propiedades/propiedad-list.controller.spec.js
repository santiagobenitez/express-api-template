'use strict';

describe('PropiedadListController', function() {
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
      propiedadController = $controller('PropiedadListController', {
        propiedades: []
      });
    });

    afterEach(function() {
      propiedadController = null;
    });

    it('should have propiedades defined', function() {
      expect(propiedadController.propiedades).toBeDefined();
    });
  });

});
