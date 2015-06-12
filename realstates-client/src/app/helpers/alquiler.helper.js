(function() {
  'use strict';
  angular.module('app.helpers').factory('alquilerHelper', alquilerHelper);

  function alquilerHelper() {

    return {
      calcularAlquileres: calcularAlquileres
    };

    function calcularAlquileres(fechaDesde, fechaHasta, tipoInteres, interes, alquiler) {

      var alquilerCalculado = alquiler || 0;
      var interesCalculado = interes || 0;
      var alquileres = [];
      var nuevoAlquiler;

      if (!fechaDesde || !fechaHasta) {
        return [];
      }

      var fechaInicioAlquiler = new Date(fechaDesde);
      var diferenciaMes = tipoInteres === 'Semestral' ? 6 : 12;
      var fechaInteres = new Date(fechaInicioAlquiler);
      fechaInteres.setMonth(fechaInicioAlquiler.getMonth() + diferenciaMes);

      if(!tipoInteres || fechaHasta <= fechaInteres){
        return [new Alquiler(fechaInicioAlquiler, fechaHasta, alquilerCalculado)];
      }

      while(fechaInteres <= fechaHasta){
        nuevoAlquiler = new Alquiler(new Date(fechaInicioAlquiler), new Date(fechaInteres), alquilerCalculado);
        alquileres.push(nuevoAlquiler);
        fechaInteres.setMonth(fechaInteres.getMonth() + diferenciaMes);
        fechaInicioAlquiler.setMonth(fechaInicioAlquiler.getMonth() + diferenciaMes);
        alquilerCalculado = interesCalculado ? alquilerCalculado + (alquilerCalculado * interesCalculado)/100 : alquilerCalculado;
      }

      if(alquileres[alquileres.length - 1].fechaHasta.toDateString() !== fechaHasta.toDateString()){
        alquileres.push(new Alquiler(fechaInicioAlquiler, fechaHasta, alquilerCalculado));
      }

      return alquileres;
    }

    function Alquiler(fechaDesde, fechaHasta, valor) {
      this.fechaDesde = fechaDesde;
      this.fechaHasta = fechaHasta;
      this.valor = valor;
    }
  }
}());
