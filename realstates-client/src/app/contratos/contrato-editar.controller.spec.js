'use strict';

describe('ContratoEditarController', function() {
  var contratoController,
    $controller,
    $state,
    $rootScope,
    contratoService,
    messageService,
    alquilerHelper;

  beforeEach(module('app'));

  beforeEach(inject(function(_$controller_, _$state_, _$rootScope_, _contratoService_, _messageService_, _alquilerHelper_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    contratoService = _contratoService_;
    messageService = _messageService_;
    alquilerHelper = _alquilerHelper_;
  }));

  afterEach(function() {
    $controller = $rootScope = $state = contratoService = messageService = alquilerHelper = null;
  });

  afterEach(function() {
    $controller = contratoController = null;
  });

  describe('functions/vars definition', function() {
    beforeEach(function() {
      contratoController = createController();
    });

    afterEach(function() {
      contratoController = null;
    });

    it('should have clientes defined', function() {
      expect(contratoController.clientes).toBeDefined();
    });

    it('should have propiedades defined', function() {
      expect(contratoController.propiedades).toBeDefined();
    });

    it('should have save defined', function() {
      expect(contratoController.save).toBeDefined();
    });
  });

  xdescribe('propietarioSeleccionado', function() {
    var $scope;
    var propiedad;
    beforeEach(function() {
      $scope = $rootScope.$new();
      propiedad = {
        propietario: {
          _id: '1',
          nombre: 'Test',
          apellido: 'Propietario'
        }
      };
      contratoController = createController([propiedad], [], $scope);
      $scope.$digest();
    });
    afterEach(function() {
      $scope = propiedad = contratoController = null;
    });

    it('should update the propietario seleccionado with one named Test Propietario when a propiedad is selected', function() {
      contratoController.contrato = {
        propiedad: propiedad._id
      };
      $scope.$digest();

      expect(contratoController.propietarioSeleccionado).toBe('Test Propietario');
    });

  });


  xdescribe('garanteNombreCompleto', function() {
    var $scope;
    var cliente, propiedad;
    beforeEach(function() {
      $scope = $rootScope.$new();
      cliente = {
        _id: '1',
        nombre: 'juan',
        apellido: 'vittori'
      };
      propiedad = {
        propietario: {
          _id: '1',
          nombre: 'Test',
          apellido: 'Propietario'
        }
      };
      contratoController = createController([propiedad], [cliente], $scope);
      $scope.$digest();
    });
    afterEach(function() {
      $scope = cliente = contratoController = null;
    });

    it('should replace the garanteNombreCompleto with one named Juan Vittori when a garante is selected', function() {
      contratoController.contrato = {
        garante: cliente._id
      };
      $scope.$digest();

      expect(contratoController.contrato.garanteNombreCompleto).toBe('juan vittori');
    });

    it('should set the propietario as empty when the controller is instantiated', function() {
      $scope.$digest();
      expect(contratoController.propietarioSeleccionado).toBe('');
    });
  });

  describe('save', function() {
    var $scope;
    var cliente, propiedad;
    beforeEach(function() {
      var $scope = $rootScope.$new();
      $scope.form = {
        $setUntouched: function() {},
        $setPristine: function() {}
      };
      cliente = {
        _id: '1',
        nombre: 'juan',
        apellido: 'vittori'
      };
      propiedad = {
        propietario: {
          _id: '1',
          nombre: 'Test',
          apellido: 'Propietario'
        }
      };
      contratoController = createController([propiedad], [cliente], $scope);
    });

    afterEach(function() {
      $scope = cliente = contratoController = null;
    });

    it('should call update of the contrato service', function() {
      spyOn(contratoService, 'update').and.returnValue({
        then: function() {}
      });

      contratoController.save();
      expect(contratoService.update.calls.count()).toBe(1);
    });

    it('should show a success message when a contrato was updated successfully', function() {
      var _successFn;

      spyOn(contratoService, 'update').and.returnValue({
        then: function(successFn) {
          _successFn = successFn;
        }
      });
      spyOn(messageService, 'success').and.callFake(function() {});

      contratoController.save();
      _successFn();

      expect(messageService.success.calls.count()).toBe(1);
    });

    it('should show an error message when there was an error while creating the propiedad', function() {
      var _errorFn;

      spyOn(contratoService, 'update').and.returnValue({
        then: function(successFn, errorFn) {
          _errorFn = errorFn;
        }
      });

      spyOn(messageService, 'error').and.callFake(function() {});

      contratoController.save();
      _errorFn('error');

      expect(messageService.error.calls.count()).toBe(1);
    });
  });

  function createController(propiedades, clientes, $scope, contrato) {
    return $controller('ContratoEditarController', {
      propiedades: propiedades || [],
      clientes: clientes || [],
      contrato: contrato || {},
      $scope: $scope || $rootScope.$new(),
      $state: $state,
      alquilerHelper: alquilerHelper,
      contratoService: contratoService,
      messageService: messageService
    });
  }

});
