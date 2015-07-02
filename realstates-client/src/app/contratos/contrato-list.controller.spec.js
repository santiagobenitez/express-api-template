'use strict';

describe('ContratoListController', function() {
  var contratoController;
  var $controller;

  beforeEach(module('app'));
  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));
  afterEach(function() {
    $controller = contratoController = null;
  });
  describe('functions/vars definition', function() {
    beforeEach(function() {
      contratoController = $controller('ContratoListController', {
        contratos: []
      });
    });

    afterEach(function() {
      contratoController = null;
    });

    it('should have contratos defined', function() {
      expect(contratoController.contratos).toBeDefined();
    });
  });

});
