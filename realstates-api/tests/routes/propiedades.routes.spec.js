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

    afterEach(function() {
      if (propiedadesService.create.restore) {
        propiedadesService.create.restore();
      }
    });

    it('should call propiedadesService create when is called with the information provided', function() {
      var mock = sinon.mock(propiedadesService);
      var req = {
        body: {}
      };
      mock.expects('create').exactly(1).withArgs(req.body);

      propiedadesRoutes.postPropiedades(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the propiedadesService when there is an error in the creation of a propiedad', function() {
      var _cb;
      var stub = sinon.stub(propiedadesService, 'create');
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
      var stub = sinon.stub(propiedadesService, 'create');
      var jsonObj = {
        json: function() {}
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
      _cb(null, {
        _id: '123'
      });

      expect(resObj.status.getCall(0).args[0]).to.eql(200);
      expect(jsonSpy.getCall(0).args[0]._id).to.eql("123");
    });

  });

  describe('getAllPropiedades', function() {

    afterEach(function() {
      if (propiedadesService.getAll.restore) propiedadesService.getAll.restore();
    });

    it('should call propiedadesService to get all the propiedades when it is called', function() {
      var mock = sinon.mock(propiedadesService);
      var req = {
        body: {}
      };
      mock.expects('getAll').exactly(1);

      propiedadesRoutes.getAllPropiedades(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the propiedadesService when there is an error in the getAll call', function() {
      var _cb;
      var stub = sinon.stub(propiedadesService, 'getAll');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        body: {}
      };

      propiedadesRoutes.getAllPropiedades(req, null, nextSpy);
      _cb = stub.getCall(0).args[0];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call res with status 200 and the items provided when the propidades were returned successfuly', function() {
      var _cb;
      var stub = sinon.stub(propiedadesService, 'getAll');
      var jsonObj = {
        json: function() {}
      }
      var resObj = {
        status: function() {}
      }
      var jsonSpy = sinon.spy(jsonObj, 'json');
      var statusStub = sinon.stub(resObj, 'status');

      statusStub.onFirstCall().returns(jsonObj);
      var req = {};
      propiedadesRoutes.getAllPropiedades(req, resObj, null);
      _cb = stub.getCall(0).args[0];
      var items = [{
        _id: '123'
      }];
      _cb(null, items);

      expect(resObj.status.getCall(0).args[0]).to.eql(200);
      expect(jsonSpy.getCall(0).args[0].items).to.eql(items);

    });

  });

  describe('getPropiedad', function() {

    afterEach(function() {
      if (propiedadesService.get.restore) propiedadesService.get.restore();
    });

    it('should call propiedadesService to get the propiedad with the id specified in the params', function() {
      var mock = sinon.mock(propiedadesService);
      var req = {
        params: {
          id: '123'
        }
      };
      mock.expects('get').exactly(1).withArgs(req.params.id);

      propiedadesRoutes.getPropiedad(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the propiedadesService when there is an error in the get call', function() {
      var _cb;
      var stub = sinon.stub(propiedadesService, 'get');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        }
      };

      propiedadesRoutes.getPropiedad(req, null, nextSpy);
      _cb = stub.getCall(0).args[1];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call res with status 200 and the propiedad when the propidad was returned successfuly', function() {

      var _cb;
      var stub = sinon.stub(propiedadesService, 'get');
      var jsonObj = {
        json: function() {}
      }
      var resObj = {
        status: function() {}
      }
      var jsonSpy = sinon.spy(jsonObj, 'json');
      var statusStub = sinon.stub(resObj, 'status');

      statusStub.onFirstCall().returns(jsonObj);
      var req = {
        params: {
          id: '123'
        }
      };
      propiedadesRoutes.getPropiedad(req, resObj, null);
      _cb = stub.getCall(0).args[1];
      var item = {
        _id: '123'
      };
      _cb(null, item);

      expect(resObj.status.getCall(0).args[0]).to.eql(200);
      expect(jsonSpy.getCall(0).args[0]._id).to.eql(item._id);
    });

  });

  describe('deletePropiedad', function() {

    afterEach(function() {
      if (propiedadesService.remove.restore) propiedadesService.remove.restore();
    });

    it('should call propiedadesService to remove the propiedad with the id specified in the params', function() {
      var mock = sinon.mock(propiedadesService);
      var req = {
        params: {
          id: '123'
        }
      };
      mock.expects('remove').exactly(1).withArgs(req.params.id);

      propiedadesRoutes.deletePropiedad(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the propiedadesService when there is an error in the remove call', function() {
      var _cb;
      var stub = sinon.stub(propiedadesService, 'remove');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        }
      };

      propiedadesRoutes.deletePropiedad(req, null, nextSpy);
      _cb = stub.getCall(0).args[1];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call res with status 200 when the propidad was removed successfuly', function() {

      var _cb;
      var stub = sinon.stub(propiedadesService, 'remove');
      var endfn = {
        end : function() {}
      }
      var resObj = {
        status: function() {}
      }
      var endSpy = sinon.spy(endfn, 'end');
      var statusStub = sinon.stub(resObj, 'status');

      statusStub.onFirstCall().returns(endfn);
      var req = {
        params: {
          id: '123'
        }
      };
      propiedadesRoutes.deletePropiedad(req, resObj, null);
      _cb = stub.getCall(0).args[1];

      _cb(null);

      expect(resObj.status.getCall(0).args[0]).to.eql(200);
      expect(endSpy.calledOnce).to.be.true;
    });

  });
});
