'use strict';

describe('PagoDetalleController', function() {
  var pagoController,
    $controller,
    alquilerHelper;

  beforeEach(module('app'));
  beforeEach(inject(function(_$controller_, _alquilerHelper_) {
    $controller = _$controller_;
    alquilerHelper = _alquilerHelper_;
  }));
  afterEach(function() {
    $controller = pagoController = alquilerHelper = null;
  });

  describe('functions/vars definition', function() {
    beforeEach(function() {
      pagoController = createControler();
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

    it('should have userIsDelayed defined', function() {
      expect(pagoController.userIsDelayed).toBeDefined();
    });

    it('should have userIsAlmostDelayed defined', function() {
      expect(pagoController.userIsAlmostDelayed).toBeDefined();
    });

    it('should have userIsUpToDate defined', function() {
      expect(pagoController.userIsUpToDate).toBeDefined();
    });
  });

  describe('userIsUpToDate', function() {

  });

  function createControler(contrato, pagos) {
    return $controller('PagoDetalleController', {
      pagos: pagos || [],
      contrato: contrato || {},
      alquilerHelper: alquilerHelper
    });
  }

});
