(function() {
  'use strict';

  angular.module('app').config(configureOAuth);

  configureOAuth.$inject = ['OAuthProvider', 'URL'];
  function configureOAuth(OAuthProvider, URL) {
    OAuthProvider.configure({
      baseUrl: URL.api,
      clientId: URL.clientId,
      clientSecret: URL.clientSecret,
      sendClientIdAndSecretInAuthorizationHeader: true,
      grantType: 'password'
    });
  }

}());
