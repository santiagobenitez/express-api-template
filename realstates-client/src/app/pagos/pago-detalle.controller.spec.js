'use strict';

describe('PagoDetalleController', function() {
  var pagoController;
  var $controller;

  beforeEach(module('app'));
  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));
  afterEach(function() {
    $controller = pagoController = null;
  });
  describe('functions/vars definition', function() {
    beforeEach(function() {
      pagoController = $controller('PagoDetalleController', {
        pagos: [],
        contrato: {}
      });
    });

    afterEach(function() {
      pagoController = null;
    });

    it('should have pagos defined and it should be a function', function() {
      expect(pagoController.pagos).toBeDefined();
    });

    it('should have contrato defined and it should be a function', function() {
      expect(pagoController.contrato).toBeDefined();
    });
  });

});
