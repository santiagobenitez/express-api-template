describe('ClienteEditarController', function() {
  var clienteController,
    clienteService,
    $controller,
    messageService,
    $rootScope;

  beforeEach(module('app'));

  beforeEach(inject(function(_$controller_, _clienteService_, _messageService_, _$rootScope_) {
    $controller = _$controller_;
    clienteService = _clienteService_;
    messageService = _messageService_;
    $rootScope = _$rootScope_;
  }));

  afterEach(function() {
    $controller = clienteService = null;
  });

  describe('functions/vars definition', function() {
    beforeEach(function() {
      var $scope = $rootScope.$new();
      $scope.form = {};
      clienteController = $controller('ClienteEditarController', {
        cliente: {
          _id: '123'
        },
        clienteService: clienteService,
        messageService: messageService,
        $scope: $scope
      });
    });

    afterEach(function() {
      clienteController = null;
    });

    it('should have saveCliente defined', function() {
      expect(clienteController.saveCliente).toBeDefined();
    });

    it('should have cliente defined', function() {
      expect(clienteController.cliente).toBeDefined();
    });
  });


  describe('saveCliente', function() {
    beforeEach(function() {
      var $scope = $rootScope.$new();
      $scope.form = {
        $setUntouched: function() {},
        $setPristine: function() {}
      };
      clienteController = $controller('ClienteEditarController', {
        cliente: {
          _id: '123'
        },
        clienteService: clienteService,
        messageService: messageService,
        $scope: $scope
      });
    });

    afterEach(function() {
      clienteController = null;
    });

    it('should call clienteService update method', function() {
      spyOn(clienteService, 'update').and.returnValue({
        then: function() {}
      });

      clienteController.saveCliente();
      expect(clienteService.update.calls.count()).toBe(1);
    });

    it('should show a success message when the cliente was updated successfully', function() {
      var _successFn;

      spyOn(clienteService, 'update').and.returnValue({
        then: function(successFn) {
          _successFn = successFn;
        }
      });

      spyOn(messageService, 'success').and.callFake(function() {});

      clienteController.saveCliente();
      _successFn();

      expect(messageService.success.calls.count()).toBe(1);
    });

    it('should show an error message when there was an error while updating the cliente', function() {
      var _errorFn;
      spyOn(clienteService, 'update').and.returnValue({
        then: function(successFn, errorFn) {
          _errorFn = errorFn;
        }
      });
      spyOn(messageService, 'error').and.callFake(function() {});

      clienteController.saveCliente();
      _errorFn();
      expect(messageService.error.calls.count()).toBe(1);
    });

  });
});
