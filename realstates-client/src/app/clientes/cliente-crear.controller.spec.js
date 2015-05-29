'use strict';

describe('ClienteCrearController', function() {
  var clienteController,
      clienteService,
      $controller;

  beforeEach(module('app'));

  beforeEach(inject(function(_$controller_, _clienteService_) {
    $controller = _$controller_;
    clienteService = _clienteService_;
  }));

  afterEach(function () {
    $controller = clienteService = null;
  });

  afterEach(function() {
    $controller = clienteController = null;
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

  });

});
