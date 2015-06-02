describe('ClienteCrearController', function() {
  var clienteController,
      clienteService,
      $controller,
      $state;

  beforeEach(module('app'));

  beforeEach(inject(function(_$controller_, _clienteService_, _$state_) {
    $controller = _$controller_;
    clienteService = _clienteService_;
    $state = _$state_;
  }));

  afterEach(function() {
    $controller = clienteService = $state = null;
  });

  describe('functions/vars definition', function() {
    beforeEach(function() {
      clienteController = $controller('ClienteCrearController', {
        clienteService: clienteService
      });
    });

    afterEach(function() {
      clienteController = null;
    });

    it('should have saveCliente defined', function() {
      expect(clienteController.saveCliente).toBeDefined();
    });
  });


  describe('saveCliente', function() {
    beforeEach(function() {
      clienteController = $controller('ClienteCrearController', {
        clienteService: clienteService
      });
    });

    afterEach(function() {
      clienteController = null;
    });

    it('should call create createCliente', function() {
      spyOn(clienteService, 'create').and.returnValue({
        then: function() {}
      });

      clienteController.saveCliente();
      expect(clienteService.create.calls.count()).toBe(1);
    });

    it('should go to the state of cliente-details when a cliente was created successfully', function() {
      var _successFn,
          _state,
          _data;

      spyOn(clienteService, 'create').and.returnValue({
        then: function(successFn) {
          _successFn = successFn;
        }
      });
      spyOn($state, 'go').and.callFake(function(state, data) {
        _state = state;
        _data = data;
      });

      clienteController.saveCliente();
      _successFn('123');

      expect(_state).toBe('cliente-details');
      expect(_data.id).toBe('123');
    });
  });
});
