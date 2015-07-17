describe('PagoEditarController', function() {
  var pagoController,
      pagoService,
      $controller,
      $state,
      $rootScope,
      alquilerHelper,
      messageService;

  beforeEach(module('app'));

  beforeEach(inject(function(_$controller_, _pagoService_, _$state_, _$rootScope_, _alquilerHelper_, _messageService_) {
    $controller = _$controller_;
    pagoService = _pagoService_;
    $state = _$state_;
    $rootScope = _$rootScope_;
    alquilerHelper = _alquilerHelper_;
    messageService = _messageService_;
  }));

  afterEach(function() {
    $controller = pagoService = $state = null;
  });

 describe('functions/vars definition', function() {
    beforeEach(function() {
      pagoController = crearController();
    });

    afterEach(function() {
      pagoController = null;
    });

    it('should have save defined', function() {
      expect(pagoController.save).toBeDefined();
    });
  });

 describe('save', function() {
    var $scope;

    beforeEach(function() {
      $scope = $rootScope.$new();
      $scope.form = {
        $setUntouched: function() {},
        $setPristine: function() {}
      };
      var contrato = {_id: 123};

      pagoController = crearController(contrato, $scope);
      pagoController.pago = {};
    });

    afterEach(function() {
      pagoController = null;
    });

    it('should call create of the pagoService', function() {
      spyOn(pagoService, 'update').and.returnValue({
        then: function() {}
      });

      pagoController.save();
      expect(pagoService.update.calls.count()).toBe(1);
    });

    it('should show a success message when a cliente was updated successfully', function() {
      var _successFn,
          _state,
          _data;

      spyOn(pagoService, 'update').and.returnValue({
        then: function(successFn) {
          _successFn = successFn;
        }
      });

      spyOn(messageService, 'success').and.callFake(function() {});

      spyOn($state, 'go').and.callFake(function(state, data) {
        _state = state;
        _data = data;
      });

      pagoController.save();
      _successFn();

      expect(messageService.success.calls.count()).toBe(1);
    });

    it('should show an error message when there was an while creating the pago', function() {
      var _errorFn,
          _state,
          _data;

      spyOn(pagoService, 'update').and.returnValue({
        then: function(successFn, errorFn) {
          _errorFn = errorFn;
        }
      });
      spyOn(messageService, 'error').and.callFake(function() {});

      pagoController.save();
      _errorFn();

      expect(messageService.error.calls.count()).toBe(1);
    });
  });

  function crearController(contrato, $scope, pago) {
    return  $controller('PagoEditarController', {
        pagoService: pagoService,
        contrato: contrato || {},
        pago: pago || {},
        $state: $state,
        messageService: messageService,
        $scope: $scope || $rootScope.$new(),
        alquilerHelper: alquilerHelper
    });
  }
});
