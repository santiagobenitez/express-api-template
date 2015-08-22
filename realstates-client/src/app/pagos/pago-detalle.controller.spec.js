'use strict';

describe('PagoDetalleController', function() {
  var pagoController,
    $controller,
    alquilerHelper,
    $modal,
    messageService,
    pagoService,
    $rootScope;

  beforeEach(module('app'));
  beforeEach(inject(function(_$controller_, _alquilerHelper_, _$modal_, _messageService_, _pagoService_, _$rootScope_) {
    $controller = _$controller_;
    alquilerHelper = _alquilerHelper_;
    $modal = _$modal_;
    messageService = _messageService_;
    pagoService = _pagoService_;
    $rootScope = _$rootScope_;
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

  describe('deletePago', function() {
    var contrato,
      pagos;

    beforeEach(function() {
      contrato = {
        _id: '123'
      };

      pagos = [{
        _id: '1'
      }, {
        _id: '2'
      }];

      pagoController = createControler(contrato, pagos);
    });

    afterEach(function() {
      pagoController = contrato = pagos = null;
    });

    it('should call remove pago of the pagoService when the user confirms the deletion of the pago', function() {
      var _confirmationFn;

      spyOn($modal, 'open').and.returnValue({
        result: {
          then: function(confirmationFn) {
            _confirmationFn = confirmationFn;
          }
        }
      });

      spyOn(pagoService, 'remove').and.returnValue({
        then: function() {}
      });

      pagoController.deletePago(pagos[0]);
      _confirmationFn();

      expect(pagoService.remove.calls.count()).toBe(1);
    });

    it('should delete a pago when the pago was removed successfully', function() {
      var _confirmationFn,
          _successFn;

      spyOn($modal, 'open').and.returnValue({
        result: {
          then: function(confirmationFn) {
            _confirmationFn = confirmationFn;
          }
        }
      });

      spyOn(pagoService, 'remove').and.returnValue({
        then: function(successFn) {
          _successFn = successFn;
        }
      });

      pagoController.deletePago(pagos[0]);
      _confirmationFn();
      _successFn();

      expect(pagos[0]._id).not.toBe('1');
    });


    it('should show an error message when there was an error while removing the pago', function() {
      var _confirmationFn,
          _errorFn;

      spyOn($modal, 'open').and.returnValue({
        result: {
          then: function(confirmationFn) {
            _confirmationFn = confirmationFn;
          }
        }
      });

      spyOn(pagoService, 'remove').and.returnValue({
        then: function(successFn, errorFn) {
          _errorFn = errorFn;
        }
      });

      spyOn(messageService, 'error').and.callFake(function() {});

      pagoController.deletePago(pagos[0]);
      _confirmationFn();
      _errorFn();

      expect(messageService.error.calls.count()).toBe(1);
    });

  });

  function createControler(contrato, pagos, $scope) {
    return $controller('PagoDetalleController', {
      pagos: pagos || [],
      contrato: contrato || {},
      alquilerHelper: alquilerHelper,
      $modal: $modal,
      messageService: messageService,
      pagoService: pagoService,
      $scope: $scope || $rootScope.$new()
    });
  }

});
