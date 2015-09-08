(function() {
  'use strict';

  angular.module('app.common').factory('authenticationService', authenticationService);

  authenticationService.$inject = ['localStorageService', '$q', 'OAuth', 'OAuthToken'];

  function authenticationService(localStorageService, $q, oauth, oauthToken) {

    var _authentication = {
      isAuth: false,
      userName: ''
    };

    return {
      logIn: logIn,
      logOut: logOut,
      isAuthenticated: isAuthenticated,
      authenticate: authenticate,
      getRefreshToken: getRefreshToken,
      getUserName: getUserName,
      authentication: _authentication,
      fillAuthData: fillAuthData
    };

    ///////////////////////////// function declarations
    function fillAuthData() {

      if (oauth.isAuthenticated()) {
        _authentication.isAuth = true;
        _authentication.userName = localStorageService.get('userName');
      }
    }

    function logIn() {
      oauth.loginConfirmed();
      fillAuthData();
    }

    function logOut() {
      oauthToken.removeToken();
      oauth.loginCancelled();

      _authentication.isAuth = false;
      _authentication.username = '';
    }

    function authenticate(user) {
      return oauth.getAccessToken(user).then(function() {
        logIn();
        localStorageService.set('userName', user.username);
      }, function(e){
        return $q.reject(e.data.message);
      });
    }

    function getRefreshToken() {
      return oauth.getRefreshToken()
        .then(function() {

          logIn();
        });
    }

    function isAuthenticated() {
      return oauth.isAuthenticated();
    }

    function getUserName() {
      return localStorageService.get('userName') || 'Anonymous';
    }
  }

}());
