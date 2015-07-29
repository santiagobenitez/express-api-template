(function() {
  'use strict';
  angular.module('app.common').factory('userService', userService);

  userService.$inject = ['$q', '$http', 'URL'];

  function userService($q, $http, URL) {

    return {
      get: get,
      getAll: getAll,
      create: create,
      update: update
    };

    function get(id) {

      return $http.get(URL.api + 'usuarios/' + id).then(function(response) {
        return response.data;
      }, function(err) {
        return $q.reject(err.data.message);
      });
    }

    function getAll() {

      return $http.get(URL.api + 'usuarios').then(function(response) {
        return response.data.items;
      }, function(err) {
        return $q.reject(err.data.message);
      });
    }

    function create(newUsuario) {

      return $http.post(URL.api + 'usuarios', newUsuario).then(function(response) {
        return response.data._id;
      }, function(err) {
        return $q.reject(err.data.message);
      });
    }

    function update(user) {
      return $http.put(URL.api + 'usuarios/' + user._id, user).then(function(response) {
        return response.data;
      }, function(err) {
        return $q.reject(err.data.message);
      });
    }

  }
}());
