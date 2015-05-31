describe('ClienteEditarController', function() {
  var clienteController,
      clienteService,
      $controller;

  beforeEach(module('app'));

  beforeEach(inject(function(_$controller_, _clienteService_) {
    $controller = _$controller_;
    clienteService = _clienteService_;
  }));

  afterEach(function() {
    $controller = clienteService = $state = null;
  });

  describe('functions/vars definition', function() {
    beforeEach(function() {
      clienteController = $controller('ClienteEditarController', {
        clienteService: clienteService,
        cliente: {}
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
      clienteController = $controller('ClienteEditarController', {
        clienteService: clienteService,
        cliente: {}
      });
    });

    afterEach(function() {
      clienteController = null;
    });
  });
});
