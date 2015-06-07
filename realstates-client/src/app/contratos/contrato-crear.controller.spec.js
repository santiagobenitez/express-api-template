'use strict';

describe('ContratoCrearController', function() {
  var contratoController,
    $controller,
    $state,
    $rootScope;

  beforeEach(module('app'));

  beforeEach(inject(function(_$controller_, _$state_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $state = _$state_;
  }));

  afterEach(function() {
    $controller = $rootScope = $state = null;
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

    xit('should set the propietario as empty when the controller is instantiated', function() {
      $scope.$digest();
      expect(contratoController.propietarioSeleccionado).toBe('');
    });
  });

  function createController(propiedades, clientes, $scope) {
    return $controller('ContratoCrearController', {
      propiedades: propiedades || [],
      clientes: clientes || [],
      $scope: $scope || $rootScope.$new()
    });
  }

});
