(function() {
  'use strict';
  angular.module('app.helpers').factory('alquilerHelper', alquilerHelper);

  function alquilerHelper() {

    return {
      calcularAlquileres: calcularAlquileres,
      getAlquilerActual: getAlquilerActual,
      alquilerVencido: alquilerVencido,
      alquilerAPuntoDeVencer: alquilerAPuntoDeVencer,
      alquilerAlDia: alquilerAlDia,
      calcularImporteSugerido: calcularImporteSugerido
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
      var fechaFinAlquiler = new Date(fechaHasta);
      var diferenciaMes = tipoInteres === 'Semestral' ? 6 : 12;
      var fechaInteres = new Date(fechaInicioAlquiler);
      fechaInteres.setMonth(fechaInicioAlquiler.getMonth() + diferenciaMes);

      if(!tipoInteres || fechaFinAlquiler <= fechaInteres){
        return [new Alquiler(fechaInicioAlquiler, fechaFinAlquiler, alquilerCalculado)];
      }

      while(fechaInteres <= fechaFinAlquiler){
        nuevoAlquiler = new Alquiler(new Date(fechaInicioAlquiler), new Date(fechaInteres), alquilerCalculado);
        alquileres.push(nuevoAlquiler);
        fechaInicioAlquiler = new Date(fechaInteres);
        fechaInicioAlquiler.setDate(fechaInicioAlquiler.getDate() + 1);
        fechaInteres = new Date(fechaInicioAlquiler);
        fechaInteres.setMonth(fechaInteres.getMonth() + diferenciaMes);
        alquilerCalculado = interesCalculado ? alquilerCalculado + (alquilerCalculado * interesCalculado)/100 : alquilerCalculado;
      }

      if(alquileres[alquileres.length - 1].fechaHasta.toDateString() !== fechaFinAlquiler.toDateString()){
        alquileres.push(new Alquiler(fechaInicioAlquiler, fechaFinAlquiler, alquilerCalculado));
      }

      return alquileres;
    }

    function getAlquilerActual(fechaDesde, fechaHasta, tipoInteres, interes, alquiler) {
      var alquileres = calcularAlquileres(fechaDesde, fechaHasta, tipoInteres, interes, alquiler);
      var fechaActual = new Date();
      fechaActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaDesde.getDate());

      if(alquileres.length === 0){
        return 0;
      }

      if(alquileres[0].fechaDesde > fechaActual){
        return alquileres[0].valor;
      }

      if(alquileres[alquileres.length - 1].fechaHasta < fechaActual){
        return alquileres[alquileres.length - 1].valor;
      }

      var alquilerActual =  alquileres.filter(function(alquiler) {
        return alquiler.fechaDesde <= fechaActual && alquiler.fechaHasta >= fechaActual;
      });

      return alquilerActual[0].valor;
    }

    function alquilerVencido(diaDeVencimiento, fechaUltimoPago, fechaActual) {
      var fechaVencimiento = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), diaDeVencimiento);
      var fechaActualSinTiempo = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());

      return fechaVencimiento < fechaActualSinTiempo && (!fechaUltimoPago || fechaActual.getMonth() !== fechaUltimoPago.getMonth());
    }

    function alquilerAPuntoDeVencer(diaDeVencimiento, fechaUltimoPago, fechaActual) {
      var fechaVencimientoTecho = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), diaDeVencimiento);
      var fechaVencimientoPiso = new Date(fechaVencimientoTecho.valueOf());
      fechaVencimientoPiso.setDate(fechaVencimientoPiso.getDate() - 3);
      var fechaActualSinTiempo = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());

      return fechaVencimientoTecho >= fechaActualSinTiempo && fechaVencimientoPiso <= fechaActualSinTiempo && (!fechaUltimoPago || fechaActual.getMonth() !== fechaUltimoPago.getMonth());
    }

    function alquilerAlDia(diaDeVencimiento, fechaUltimoPago, fechaActual) {
      var fechaVencimientoTecho = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), diaDeVencimiento);
      var fechaVencimientoPiso = new Date(fechaVencimientoTecho.valueOf());
      fechaVencimientoPiso.setDate(fechaVencimientoPiso.getDate() - 3);
      var fechaActualSinTiempo = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());

      return fechaActualSinTiempo < fechaVencimientoPiso || (fechaUltimoPago && fechaActual.getMonth() === fechaUltimoPago.getMonth());
    }

    function calcularImporteSugerido(diaDeVencimiento, fechaHasta, fechaDePago, alquiler, multaDiaria) {
      var fechaVencimiento = new Date(fechaDePago.getFullYear(), fechaDePago.getMonth(), diaDeVencimiento);
      var fechaActualSinTiempo = new Date(fechaHasta.getFullYear(), fechaHasta.getMonth(), fechaHasta.getDate());

      if (fechaVencimiento >= fechaActualSinTiempo) {
        return alquiler;
      }

      var diasDeDiferencia = daydiff(fechaVencimiento, fechaActualSinTiempo);
      var multaDiariaValor = (multaDiaria * alquiler)/100;
      return alquiler + (multaDiariaValor * (diasDeDiferencia - 1));
    }

    function daydiff(first, second) {
      return (second - first) / (1000 * 60 * 60 * 24);
    }

    function Alquiler(fechaDesde, fechaHasta, valor) {
      this.fechaDesde = fechaDesde;
      this.fechaHasta = fechaHasta;
      this.valor = valor;
    }
  }
}());
