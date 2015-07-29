describe('UserEditarController', function() {
  var userController,
    userService,
    $controller,
    messageService,
    $rootScope;

  beforeEach(module('app'));

  beforeEach(inject(function(_$controller_, _userService_, _messageService_, _$rootScope_) {
    $controller = _$controller_;
    userService = _userService_;
    messageService = _messageService_;
    $rootScope = _$rootScope_;
  }));

  afterEach(function() {
    $controller = userService = null;
  });

  describe('functions/vars definition', function() {
    beforeEach(function() {
      var $scope = $rootScope.$new();
      $scope.form = {};
      userController = $controller('UserEditarController', {
        user: {
          _id: '123'
        },
        userService: userService,
        messageService: messageService,
        $scope: $scope
      });
    });

    afterEach(function() {
      userController = null;
    });

    it('should have saveUsuario defined', function() {
      expect(userController.saveUsuario).toBeDefined();
    });

    it('should have user defined', function() {
      expect(userController.user).toBeDefined();
    });
  });


  describe('saveUsuario', function() {
    beforeEach(function() {
      var $scope = $rootScope.$new();
      $scope.form = {
        $setUntouched: function() {},
        $setPristine: function() {}
      };
      userController = $controller('UserEditarController', {
        user: {
          _id: '123'
        },
        userService: userService,
        messageService: messageService,
        $scope: $scope
      });
    });

    afterEach(function() {
      userController = null;
    });

    it('should call userService update method', function() {
      spyOn(userService, 'update').and.returnValue({
        then: function() {}
      });

      userController.saveUsuario();
      expect(userService.update.calls.count()).toBe(1);
    });

    it('should show a success message when the user was updated successfully', function() {
      var _successFn;

      spyOn(userService, 'update').and.returnValue({
        then: function(successFn) {
          _successFn = successFn;
        }
      });

      spyOn(messageService, 'success').and.callFake(function() {});

      userController.saveUsuario();
      _successFn();

      expect(messageService.success.calls.count()).toBe(1);
    });

    it('should show an error message when there was an error while updating the user', function() {
      var _errorFn;
      spyOn(userService, 'update').and.returnValue({
        then: function(successFn, errorFn) {
          _errorFn = errorFn;
        }
      });
      spyOn(messageService, 'error').and.callFake(function() {});

      userController.saveUsuario();
      _errorFn();
      expect(messageService.error.calls.count()).toBe(1);
    });

  });
});
