describe('PagoCrearController', function() {
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
    beforeEach(function() {

      var contrato = {_id: 123};

      pagoController = crearController(contrato);
      pagoController.pago = {};
    });

    afterEach(function() {
      pagoController = null;
    });

    it('should call create of the pagoService', function() {
      spyOn(pagoService, 'create').and.returnValue({
        then: function() {}
      });

      pagoController.save();
      expect(pagoService.create.calls.count()).toBe(1);
    });

    it('should go to the state of pago-edit when a cliente was created successfully', function() {
      var _successFn,
          _state,
        _data;

      spyOn(pagoService, 'create').and.returnValue({
        then: function(successFn) {
          _successFn = successFn;
        }
      });
      spyOn($state, 'go').and.callFake(function(state, data) {
        _state = state;
        _data = data;
      });

      pagoController.save();
      _successFn('123');

      expect(_state).toBe('pago-edit');
      expect(_data.pagoid).toBe('123');
    });

    it('should show an error message when there was an while creating the pago', function() {
      var _errorFn;

      spyOn(pagoService, 'create').and.returnValue({
        then: function(successFn, errorFn) {
          _errorFn = errorFn;
        }
      });
      spyOn(messageService, 'error').and.callFake(function() {});

      pagoController.save();
      _errorFn('error');

      expect(messageService.error.calls.count()).toBe(1);
    });
  });

  function crearController(contrato, $scope) {
    return  $controller('PagoCrearController', {
        pagoService: pagoService,
        contrato: contrato || {},
        $state: $state,
        messageService: messageService,
        $scope: $scope || $rootScope.$new(),
        alquilerHelper: alquilerHelper
    });
  }
});
