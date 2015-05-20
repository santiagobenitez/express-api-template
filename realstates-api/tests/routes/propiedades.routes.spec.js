var propiedadesService = require('../../services/propiedades.service');
var propiedadesRoutes = require('../../routes/propiedades/propiedades.routes');
var sinon = require('sinon');
var expect = require('chai').expect;

describe('propiedadesRoutes', function() {

  describe('function declarations', function() {
    it('should have postPropiedades defined', function() {
      expect(propiedadesRoutes.postPropiedades).to.exist;
    })
  });

  describe('postPropiedades', function() {

    afterEach(function () {
      if(propiedadesService.crear.restore){
        propiedadesService.crear.restore();
      }
    });

    it('should call propiedadesService crear when is called with the information provided', function() {
      var mock = sinon.mock(propiedadesService);
      var req = {
        body: {}
      };
      mock.expects('crear').exactly(1).withArgs(req.body);

      propiedadesRoutes.postPropiedades(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the propiedadesService when there is an error in the creation of a propiedad', function() {
      var _cb;
      var stub = sinon.stub(propiedadesService, 'crear');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        body: {}
      };

      propiedadesRoutes.postPropiedades(req, null, nextSpy);
      _cb = stub.getCall(0).args[1];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call res with status 200 and the id provided when the propiedad was successfuly created', function() {
      var _cb;
      var stub = sinon.stub(propiedadesService, 'crear');
      var jsonObj = {
        json: function(){}
      }
      var resObj = {
        status: function() {}
      }
      var jsonSpy = sinon.spy(jsonObj, 'json');
      var statusStub = sinon.stub(resObj, 'status');

      statusStub.onFirstCall().returns(jsonObj);
      var req = {};
      propiedadesRoutes.postPropiedades(req, resObj, null);
      _cb = stub.getCall(0).args[1];
      _cb(null, "123");

      expect(resObj.status.getCall(0).args[0]).to.eql(200);
      expect(jsonSpy.getCall(0).args[0].id).to.eql("123");

    });

  });
});
