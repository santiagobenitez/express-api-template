/**
 * angular-oauth2 - Angular OAuth2
 * @version v2.1.0
 * @link https://github.com/seegno/angular-oauth2
 * @license MIT
 */
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["angular", "query-string"], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require("angular"), require("query-string"));
  } else {
    root.angularOAuth2 = factory(root.angular, root.queryString);
  }
})(this, function(angular, queryString) {
  var ngModule = angular.module("angular-oauth2", ['base64']).config(oauthConfig).factory("httpBuffer", httpBuffer).factory("oauthInterceptor", oauthInterceptor).provider("OAuth", OAuthProvider).provider("OAuthToken", OAuthTokenProvider);

  oauthConfig.$inject = ["$httpProvider"];

  function oauthConfig($httpProvider) {
    $httpProvider.interceptors.push("oauthInterceptor");
  }

  httpBuffer.$inject = ["$injector"];

  function httpBuffer($injector) {
    var requestBuffer = [];

    // Service initialized later because of circular dependency problem.
    var $http;

    function retryHttpRequest(config, deferred) {
      function successCallback(response) {
        deferred.resolve(response);
      }

      function errorCallback(response) {
        deferred.reject(response);
      }

      $http = $http || $injector.get('$http');
      $http(config).then(successCallback, errorCallback);
    }

    return {
      append: function(config, deferred) {
        requestBuffer.push({
          config: config,
          deferred: deferred
        });
      },

      rejectAll: function(reason) {
        if (reason) {
          for (var i = 0; i < requestBuffer.length; ++i) {
            requestBuffer[i].deferred.reject(reason);
          }
        }
        requestBuffer = [];
      },

      retryAll: function(updater) {
        for (var i = 0; i < requestBuffer.length; ++i) {
          retryHttpRequest(updater(requestBuffer[i].config), requestBuffer[i].deferred);
        }
        requestBuffer = [];
      },

      clean: function() {
        return requestBuffer.length === 0;
      }
    };
  }

  oauthInterceptor.$inject = ["$q", "$rootScope", "OAuthToken", "httpBuffer"];

  function oauthInterceptor($q, $rootScope, OAuthToken, httpBuffer) {
    var emitOAuthError = function(rejection) {
      var deferred = $q.defer();
      httpBuffer.append(rejection.config, deferred);
      $rootScope.$emit("oauth:error", rejection);
      return deferred.promise;
    };

    return {
      request: function(config) {
        if (OAuthToken.getAuthorizationHeader()) {
          config.headers = config.headers || {};
          if (!config.headers.Authorization) {
            config.headers.Authorization = OAuthToken.getAuthorizationHeader();
          }
        }
        return config;
      },
      responseError: function(rejection) {
        var parseWwwAuthenticateHeader = function(header) {
          var result = {};
          result.scheme = header.split(" ", 1)[0].toUpperCase();
          header = header.replace(/^\w+\s+/ig, '');
          var keyValuePairs = header.split(",");
          for (var i = 0; i < keyValuePairs.length; i++) {
            var keyValuePair = keyValuePairs[i].split("=");
            if (keyValuePair.length == 2) {
              var key = keyValuePair[0].replace(/^[\s"]+|[\s"]+$/g, '');
              var value = keyValuePair[1].replace(/^[\s"]+|[\s"]+$/g, '');
              result[key] = value;
            }
          }
          return result;
        };

        if (400 === rejection.status && rejection.data && ("invalid_request" === rejection.data.message || "invalid_grant" === rejection.data.message)) {
          OAuthToken.removeToken();
          return emitOAuthError(rejection);
        }
        if (401 === rejection.status && (rejection.data && "invalid_token" === rejection.data.message)) {
          return emitOAuthError(rejection);
        }
        if (401 === rejection.status && rejection.headers('WWW-Authenticate')) {
          var header = parseWwwAuthenticateHeader(rejection.headers('WWW-Authenticate'));
          if (header.scheme == "BEARER") {
            if (!rejection.data) {
              rejection.data = {};
            }
            rejection.data = angular.extend(header, rejection.data);
            return emitOAuthError(rejection);
          }
        }
        return $q.reject(rejection);
      }
    };
  }

  var _prototypeProperties = function(child, staticProps, instanceProps) {
    if (staticProps) Object.defineProperties(child, staticProps);
    if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
  };
  var defaults = {
    baseUrl: null,
    clientId: null,
    clientSecret: null,
    sendClientIdAndSecretInAuthorizationHeader: false,
    grantType: "password",
    grantPath: "/token",
    revokePath: "/revoke"
  };

  var requiredKeys = ["baseUrl", "clientId", "grantType", "grantPath", "revokePath"];

  function OAuthProvider() {
    var config;
    this.configure = function(params) {
      if (config) {
        throw new Error("Already configured.");
      }
      if (!(params instanceof Object)) {
        throw new TypeError("Invalid argument: `config` must be an `Object`.");
      }
      config = angular.extend({}, defaults, params);
      angular.forEach(requiredKeys, function(key) {
        if (!config[key]) {
          throw new Error("Missing parameter: " + key + ".");
        }
      });
      if ("/" === config.baseUrl.substr(-1)) {
        config.baseUrl = config.baseUrl.slice(0, -1);
      }
      if ("/" !== config.grantPath[0]) {
        config.grantPath = "/" + config.grantPath;
      }
      if ("/" !== config.revokePath[0]) {
        config.revokePath = "/" + config.revokePath;
      }
      return config;
    };
    this.$get = function($rootScope, $http, $base64, OAuthToken, httpBuffer) {
      var OAuth = function() {
        function OAuth() {
          if (!config) {
            throw new Error("`OAuthProvider` must be configured first.");
          }
        }
        var refreshTokenPromise;

        _prototypeProperties(OAuth, null, {
          isAuthenticated: {
            value: function isAuthenticated() {
              return !!OAuthToken.token;
            },
            writable: true,
            enumerable: true,
            configurable: true
          },
          getAccessToken: {
            value: function getAccessToken(user, options) {
              if (!user || !user.username || !user.password) {
                throw new Error("`user` must be an object with `username` and `password` properties.");
              }
              var scopes = config.scopes || "";

              var data = {
                client_id: config.clientId,
                grant_type: config.grantType,
                username: user.username,
                password: user.password,
                scope: scopes
              };
              if (null !== config.clientSecret) {
                data.client_secret = config.clientSecret;
              }
              var headers = {
                "Content-Type": "application/x-www-form-urlencoded",
              };
              if (config.sendClientIdAndSecretInAuthorizationHeader) {
                var clientIdAndSecret = config.clientId;
                if (null !== config.clientSecret) {
                  clientIdAndSecret += ":" + config.clientSecret;
                }
                headers = angular.extend({
                  'Authorization': 'Basic ' + $base64.encode(clientIdAndSecret)
                }, headers);
              } else {
                data.client_id = config.client_id;
                if (null !== config.clientSecret) {
                  data.client_secret = config.clientSecret;
                }
              }

              data = queryString.stringify(data);
              options = angular.extend({
                'headers': headers
              }, options);

              return $http.post("" + config.baseUrl + "" + config.grantPath, data, options).then(function(response) {
                OAuthToken.token = response.data;
                return response;
              });
            },
            writable: true,
            enumerable: true,
            configurable: true
          },
          getRefreshToken: {
            value: function getRefreshToken() {

              var data = {
                grant_type: "refresh_token",
                refresh_token: OAuthToken.getRefreshToken(),
                //userScopes: OAuthToken.getUserScopes(),
              };
              var headers = {
                "Content-Type": "application/x-www-form-urlencoded"
              };
              if (config.sendClientIdAndSecretInAuthorizationHeader) {
                var clientIdAndSecret = config.clientId;
                if (null !== config.clientSecret) {
                  clientIdAndSecret += ":" + config.clientSecret;
                }
                headers = angular.extend({
                  'Authorization': 'Basic ' + $base64.encode(clientIdAndSecret)
                }, headers);
              } else {
                data.client_id = config.client_id;
                if (null !== config.clientSecret) {
                  data.client_secret = config.clientSecret;
                }
              }
              data = queryString.stringify(data);
              var options = {
                'headers': headers
              };

              if (!refreshTokenPromise) {
                refreshTokenPromise = $http.post("" + config.baseUrl + "" + config.grantPath, data, options).then(function(response) {
                  refreshTokenPromise = null;
                  OAuthToken.token = response.data;
                  return response;
                }).catch(function(err) {
                  refreshTokenPromise = null;
                  return $q.reject(err);
                });
              }

              return refreshTokenPromise;

            },
            writable: true,
            enumerable: true,
            configurable: true
          },
          revokeToken: {
            value: function revokeToken() {
              var data = queryString.stringify({
                token: OAuthToken.getRefreshToken() ? OAuthToken.getRefreshToken() : OAuthToken.getAccessToken()
              });
              var options = {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              };
              return $http.post("" + config.baseUrl + "" + config.revokePath, data, options).then(function(response) {
                OAuthToken.removeToken();
                return response;
              });
            },
            writable: true,
            enumerable: true,
            configurable: true
          },
          loginConfirmed: {
            value: function loginConfirmed(data, configUpdater) {
              var updater = configUpdater || function(config) {
                config.headers.Authorization = null;
                return config;
              };
              $rootScope.$broadcast('event:auth-loginConfirmed', data);
              httpBuffer.retryAll(updater);
            },
            writable: true,
            enumerable: true,
            configurable: true
          },
          loginCancelled: function(data, reason) {
            httpBuffer.rejectAll(reason);
            $rootScope.$broadcast('event:auth-loginCancelled', data);
          }
        });
        return OAuth;
      }();
      return new OAuth();
    };
    this.$get.$inject = ["$rootScope", "$http", "$base64", "OAuthToken", "httpBuffer"];
  }

  function OAuthTokenProvider() {
    var config = {
      name: "token"
    };
    this.configure = function(params) {
      if (!(params instanceof Object)) {
        throw new TypeError("Invalid argument: `config` must be an `Object`.");
      }
      angular.extend(config, params);
      return config;
    };
    this.$get = function() {
      var OAuthToken = function() {
        function OAuthToken() {}
        _prototypeProperties(OAuthToken, null, {
          token: {
            set: function(data) {
              return localStorage[config.name] = angular.toJson(data);
            },
            get: function() {
              return angular.fromJson(localStorage[config.name]);
            },
            enumerable: true,
            configurable: true
          },
          getAccessToken: {
            value: function getAccessToken() {
              return this.token ? this.token.access_token : undefined;
            },
            writable: true,
            enumerable: true,
            configurable: true
          },
          getAuthorizationHeader: {
            value: function getAuthorizationHeader() {
              if (!(this.getTokenType() && this.getAccessToken())) {
                return;
              }
              return "" + (this.getTokenType().charAt(0).toUpperCase() + this.getTokenType().substr(1)) + " " + this.getAccessToken();
            },
            writable: true,
            enumerable: true,
            configurable: true
          },
          getRefreshToken: {
            value: function getRefreshToken() {
              return this.token ? this.token.refresh_token : undefined;
            },
            writable: true,
            enumerable: true,
            configurable: true
          },
          getUserScopes: {
            value: function getUserScopes() {
              return this.token ? this.token.scope.split(' ') : [];
            },
            writable: true,
            enumerable: true,
            configurable: true
          },
          getTokenType: {
            value: function getTokenType() {
              return this.token ? this.token.token_type : undefined;
            },
            writable: true,
            enumerable: true,
            configurable: true
          },
          removeToken: {
            value: function removeToken() {
              return localStorage.removeItem(config.name);
            },
            writable: true,
            enumerable: true,
            configurable: true
          }
        });
        return OAuthToken;
      }();
      return new OAuthToken();
    };
  }
  return ngModule;
});
