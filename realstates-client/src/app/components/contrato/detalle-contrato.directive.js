(function() {
  'use strict';

  angular.module('app.components.contrato').directive('contratoDetalle', contratoDetalle);

  contratoDetalle.$inject = ['alquilerHelper'];
  function contratoDetalle(alquilerHelper) {

    return {
      restrict: 'E',
      templateUrl: 'app/components/contrato/detalle-contrato.html',
      scope: {
        contrato: '='
      },
      link: linkFn
    };

    function linkFn(scope) {
      scope.alquilerCalculado = alquilerHelper.getAlquilerActual(new Date(scope.contrato.fechaDesde), new Date(scope.contrato.fechaHasta), scope.contrato.tipoInteres, scope.contrato.interes, scope.contrato.alquiler);
    }
  }
}());
