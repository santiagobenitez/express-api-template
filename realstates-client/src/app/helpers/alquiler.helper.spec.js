describe('AlquilerHelper', function() {
  var alquilerHelper;

  beforeEach(module('app'));

  afterEach(function() {
    alquilerHelper = null;
  });

  describe('functions definition', function() {

    beforeEach(inject(function(_alquilerHelper_) {
      alquilerHelper = _alquilerHelper_;
    }));

    afterEach(function() {
      alquilerHelper = null;
    });

    it('should have calcularAlquilres defined', function() {
      expect(alquilerHelper.calcularAlquileres).toBeDefined();
    })
  });

  describe('calcularAlquileres', function() {
    beforeEach(inject(function(_alquilerHelper_) {
      alquilerHelper = _alquilerHelper_;
    }));

    afterEach(function() {
      alquilerHelper = null;
    });

    it('should return an empty array when any of the dates are not defined', function() {

      var result = alquilerHelper.calcularAlquileres();

      expect(result.length).toBe(0);
    });

    it('should return one alquiler of valor 0 when the tipoInteres is undefined', function() {

      var fechaDesde = new Date();
      var fechaHasta = new Date(fechaDesde);
      fechaHasta.setDate(fechaDesde.getDate() + 1);

      var result = alquilerHelper.calcularAlquileres(fechaDesde, fechaHasta);

      expect(result.length).toBe(1);
      expect(result[0].fechaDesde).toBe(fechaDesde);
      expect(result[0].fechaHasta).toBe(fechaHasta);
      expect(result[0].valor).toBe(0);

    });
  });



});
