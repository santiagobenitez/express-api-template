// jshint ignore: start

var propiedadesRepository = require('../../data/propiedades.repository');
var propiedadesService = require('../../services/propiedades.service');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('propiedadesService', function() {

  describe('function declaration/definition', function() {
    it('should have crear defined', function() {
      expect(propiedadesService.crear).to.exist;
    });
  });

  describe('crear', function() {
    var propiedadesRepoSpy;

    it('should call crear of the propiedadesRepository with a propiedad of two ambientes when it is called with such a propiedad', function() {
      var propiedad = {
        ambientes: 2
      };
      var mock = sinon.mock(propiedadesRepository);
      mock.expects('crear').withArgs(propiedad).exactly(1);

      propiedadesService.crear(propiedad, function(e, obj) {});

      mock.verify();
    });
  });
});

