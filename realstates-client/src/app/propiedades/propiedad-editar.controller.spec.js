describe('PropiedadEditarController', function() {
  var propiedadController,
    propiedadService,
    $controller,
    messageService,
    $rootScope;

  beforeEach(module('app'));

  beforeEach(inject(function(_$controller_, _propiedadService_, _messageService_, _$rootScope_) {
    $controller = _$controller_;
    propiedadService = _propiedadService_;
    messageService = _messageService_;
    $rootScope = _$rootScope_;
  }));

  afterEach(function() {
    $controller = propiedadService = null;
  });

  describe('functions/vars definition', function() {
    beforeEach(function() {
      var $scope = $rootScope.$new();
      $scope.form = {};
      propiedadController = $controller('PropiedadEditarController', {
        propiedad: {
          _id: '123'
        },
        clientes: [],
        propiedadService: propiedadService,
        messageService: messageService,
        $scope: $scope
      });
    });

    afterEach(function() {
      propiedadController = null;
    });

    it('should have save defined', function() {
      expect(propiedadController.save).toBeDefined();
    });

    it('should have propiedad defined', function() {
      expect(propiedadController.propiedad).toBeDefined();
    });
  });


  describe('save', function() {
    beforeEach(function() {
      var $scope = $rootScope.$new();
      $scope.form = {
        $setUntouched: function() {},
        $setPristine: function() {}
      };
      propiedadController = $controller('PropiedadEditarController', {
        propiedad: {
          _id: '123'
        },
        clientes: [],
        propiedadService: propiedadService,
        messageService: messageService,
        $scope: $scope
      });
    });

    afterEach(function() {
      propiedadController = null;
    });

    it('should call propiedadService update method', function() {
      spyOn(propiedadService, 'update').and.returnValue({
        then: function() {}
      });

      propiedadController.save();
      expect(propiedadService.update.calls.count()).toBe(1);
    });

    it('should show a success message when the propiedad was updated successfully', function() {
      var _successFn;

      spyOn(propiedadService, 'update').and.returnValue({
        then: function(successFn) {
          _successFn = successFn;
        }
      });

      spyOn(messageService, 'success').and.callFake(function() {});

      propiedadController.save();
      _successFn();

      expect(messageService.success.calls.count()).toBe(1);
    });

    it('should show an error message when there was an error while updating the propiedad', function() {
      var _errorFn;
      spyOn(propiedadService, 'update').and.returnValue({
        then: function(successFn, errorFn) {
          _errorFn = errorFn;
        }
      });
      spyOn(messageService, 'error').and.callFake(function() {});

      propiedadController.save();
      _errorFn();
      expect(messageService.error.calls.count()).toBe(1);
    });

  });
});
