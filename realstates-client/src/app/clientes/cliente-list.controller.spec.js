'use strict';

describe('ClienteListController', function() {
  var clienteController;
  var $controller;

  beforeEach(module('app'));
  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  afterEach(function() {
    $controller = clienteController = null;
  });

  describe('functions/vars definition', function() {
    beforeEach(function() {
      clienteController = $controller('ClienteListController', {
        clientes: []
      });
    });

    afterEach(function() {
      clienteController = null;
    });

    it('should have clientes defined', function() {
      expect(clienteController.clientes).toBeDefined();
    });

  });
});
