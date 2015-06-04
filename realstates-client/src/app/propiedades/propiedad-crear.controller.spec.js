'use strict';

describe('PropiedadCrearController', function() {
  var propiedadController,
    propiedadService,
    $controller,
    messageService,
    $state;

  beforeEach(module('app'));

  beforeEach(inject(function(_$controller_, _propiedadService_, _messageService_, _$state_) {
    $controller = _$controller_;
    propiedadService = _propiedadService_;
    messageService = _messageService_;
    $state = _$state_;
  }));

  afterEach(function() {
    $controller = propiedadService = null;
  });

  afterEach(function() {
    $controller = propiedadController = null;
  });

  describe('functions/vars definition', function() {
    beforeEach(function() {
      propiedadController = createController();

    });

    afterEach(function() {
      propiedadController = null;
    });

    it('should have save defined and it should be a function', function() {
      expect(propiedadController.save).toBeDefined();
    });
  });

  describe('save', function() {
    beforeEach(function() {
      propiedadController = createController();
    });

    afterEach(function() {
      propiedadController = null;
    });

    it('should call create createCliente', function() {
      spyOn(propiedadService, 'create').and.returnValue({
        then: function() {}
      });

      propiedadController.save();
      expect(propiedadService.create.calls.count()).toBe(1);
    });

    it('should go to the state of propiedad-edit when a propiedad was created successfully', function() {
      var _successFn,
        _state,
        _data;

      spyOn(propiedadService, 'create').and.returnValue({
        then: function(successFn) {
          _successFn = successFn;
        }
      });
      spyOn($state, 'go').and.callFake(function(state, data) {
        _state = state;
        _data = data;
      });

      propiedadController.save();
      _successFn('123');

      expect(_state).toBe('propiedad-edit');
      expect(_data.id).toBe('123');
    });

    it('should show an error message when there was an error while creating the propiedad', function() {
      var _errorFn,
        _state,
        _data;

      spyOn(propiedadService, 'create').and.returnValue({
        then: function(successFn, errorFn) {
          _errorFn = errorFn;
        }
      });

      spyOn(messageService, 'error').and.callFake(function() {});

      propiedadController.save();
      _errorFn('error');

      expect(messageService.error.calls.count()).toBe(1);
    });
  });

  function createController(clientes) {
    return $controller('PropiedadCrearController', {
      propiedadService: propiedadService,
      clientes: clientes || [],
      messageService: messageService,
      $state: $state
    })
  }


});
