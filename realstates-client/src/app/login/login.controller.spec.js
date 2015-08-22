describe('LoginController test suite', function() {

  var loginController,
    authenticationService,
    $controller,
    $state,
    $q;

  beforeEach(module('app'));

  beforeEach(inject(function(_authenticationService_, _$state_, _$controller_, _$q_) {
    authenticationService = _authenticationService_;
    $state = _$state_;
    $controller = _$controller_;
    $q = _$q_;
  }));

  afterEach(function() {
    authenticationService = $state = $controller = null;
  });

  describe('logIn', function() {

    beforeEach(function() {
      loginController = $controller('LoginController', {
        authenticationSvc: authenticationService,
        $state: $state
      });
    });

    afterEach(function() {
      loginController = null;
    });

    it('should redirect to inicio state when user successfully loged in', function() {
      var fakeCall = fakeAsyncCall();
      var expectedNewState = 'inicio';
      var resultedState = '';
      loginController.userName = 'test';
      loginController.password = 'test';
      spyOn(authenticationService, 'authenticate').and.returnValue(fakeCall);
      spyOn($state, 'go').and.callFake(function(newState) {
        resultedState = newState;
      });

      loginController.logIn();
      fakeCall.flush({});

      expect(resultedState).toBe(expectedNewState);
    });


    it('should updated the error msg when the user the fail to log in', function() {
      var fakeCall = fakeAsyncCall();
      var errorResult = 'unexpected error';
      loginController.errorMsg = '';
      var resultedState = '';

      loginController.userName = 'test';
      loginController.password = 'test';
      spyOn(authenticationService, 'authenticate').and.returnValue(fakeCall);
      spyOn($state, 'go').and.callFake(function(newState) {
        resultedState = newState;
      });

      loginController.logIn();
      fakeCall.flushWithErrors(errorResult);

      expect(loginController.errorMsg).toBe(errorResult);
    });

    it('should updated the error msg when either the user or the password are null', function() {
      loginController.errorMsg = '';

      loginController.logIn();

      expect(loginController.errorMsg).toBe('User Name and Password are required');
    });
  });

  function fakeAsyncCall() {
    var confirmCallBack;
    var errorCallBack;
    return {
      then: function(successCallBack, failCallBack) {
        confirmCallBack = successCallBack;
        errorCallBack = failCallBack;
      },
      flush: function(obj) {
        confirmCallBack(obj);
      },
      flushWithErrors: function(msg) {
        errorCallBack(msg);
      }
    };
  }

});
