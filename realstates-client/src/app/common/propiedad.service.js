(function() {
  'use strict';
  angular.module('app.common').factory('propiedadService', propiedadService);

  propiedadService.$inject = ['$q', '$http', 'URL'];

  function propiedadService($q, $http, URL) {

    return {
      get: get,
      getAll: getAll,
      create: create,
      update: update
    };

    function get(id) {
      return $http.get(URL.api + 'propiedades/' + id).then(function(response) {
        return response.data;
      }, function(err) {
        return $q.reject(err.data.message);
      });
    }

    function getAll() {

      return $http.get(URL.api + 'propiedades').then(function(response) {
        return response.data.items;
      }, function(err) {
        return $q.reject(err.data);
      });
    }

    function create(newPropiedad) {

      return $http.post(URL.api + 'propiedades', newPropiedad).then(function(response) {
        return response.data._id;
      }, function(err) {
        return $q.reject(err.data.message);
      });
    }

    function update(propiedad) {
      return $http.put(URL.api + 'propiedades/' + propiedad._id, propiedad).then(function(response) {
        return response.data;
      }, function(err) {
        return $q.reject(err.data.message);
      });
    }

  }
}());
