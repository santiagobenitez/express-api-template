describe('UserCrearController', function() {
  var userController,
      userService,
      $controller,
      $state;

  beforeEach(module('app'));

  beforeEach(inject(function(_$controller_, _userService_, _$state_) {
    $controller = _$controller_;
    userService = _userService_;
    $state = _$state_;
  }));

  afterEach(function() {
    $controller = userService = $state = null;
  });

  describe('functions/vars definition', function() {
    beforeEach(function() {
      userController = $controller('UserCrearController', {
        userService: userService
      });
    });

    afterEach(function() {
      userController = null;
    });

    it('should have saveUsuario defined', function() {
      expect(userController.saveUsuario).toBeDefined();
    });
  });


  describe('saveUsuario', function() {
    beforeEach(function() {
      userController = $controller('UserCrearController', {
        userService: userService
      });
    });

    afterEach(function() {
      userController = null;
    });

    it('should call create createCliente', function() {
      spyOn(userService, 'create').and.returnValue({
        then: function() {}
      });

      userController.saveUsuario();
      expect(userService.create.calls.count()).toBe(1);
    });

    it('should go to the state of user-edit when a user was created successfully', function() {
      var _successFn,
          _state,
          _data;

      spyOn(userService, 'create').and.returnValue({
        then: function(successFn) {
          _successFn = successFn;
        }
      });
      spyOn($state, 'go').and.callFake(function(state, data) {
        _state = state;
        _data = data;
      });

      userController.saveUsuario();
      _successFn('123');

      expect(_state).toBe('user-edit');
      expect(_data.id).toBe('123');
    });
  });
});
