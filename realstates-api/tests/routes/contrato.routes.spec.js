// jshint ignore: start

var contratoService = require('../../services/contrato.service');
var contratoRoutes = require('../../routes/contratos/contrato.routes');
var sinon = require('sinon');
var expect = require('chai').expect;

describe('contratoRoutes', function() {

  describe('function declarations', function() {
    it('should have post defined', function() {
      expect(contratoRoutes.post).to.exist;
    });
    it('should have get defined', function() {
      expect(contratoRoutes.get).to.exist;
    });
    it('should have getAll defined', function() {
      expect(contratoRoutes.getAll).to.exist;
    });
    it('should have remove defined', function() {
      expect(contratoRoutes.remove).to.exist;
    });
    it('should have update defined', function() {
      expect(contratoRoutes.update).to.exist;
    });
  });

  describe('post', function() {

    afterEach(function() {
      if (contratoService.create.restore) {
        contratoService.create.restore();
      }
    });

    it('should call contratoService create when is called with the information provided', function() {
      var mock = sinon.mock(contratoService);
      var req = {
        body: {}
      };
      mock.expects('create').exactly(1).withArgs(req.body);

      contratoRoutes.post(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the contratoService when there is an error in the creation of a contrato', function() {
      var _cb;
      var stub = sinon.stub(contratoService, 'create');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        body: {}
      };

      contratoRoutes.post(req, null, nextSpy);
      _cb = stub.getCall(0).args[1];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call res with status 200 and the id provided when the contrato was successfuly created', function() {
      var _cb;
      var stub = sinon.stub(contratoService, 'create');
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
      contratoRoutes.post(req, resObj, null);
      _cb = stub.getCall(0).args[1];
      _cb(null, {
        _id: '123'
      });

      expect(resObj.status.getCall(0).args[0]).to.eql(200);
      expect(jsonSpy.getCall(0).args[0]._id).to.eql("123");
    });

  });

  describe('getAll', function() {

    afterEach(function() {
      if (contratoService.getAll.restore) contratoService.getAll.restore();
    });

    it('should call contratoService to get all the clientes when it is called', function() {
      var mock = sinon.mock(contratoService);
      var req = {
        body: {}
      };
      mock.expects('getAll').exactly(1);

      contratoRoutes.getAll(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the contratoService when there is an error in the getAll call', function() {
      var _cb;
      var stub = sinon.stub(contratoService, 'getAll');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        body: {}
      };

      contratoRoutes.getAll(req, null, nextSpy);
      _cb = stub.getCall(0).args[0];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call res with status 200 and the items provided when the clientes were returned successfuly', function() {
      var _cb;
      var stub = sinon.stub(contratoService, 'getAll');
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
      contratoRoutes.getAll(req, resObj, null);
      _cb = stub.getCall(0).args[0];
      var items = [{
        _id: '123'
      }];
      _cb(null, items);

      expect(resObj.status.getCall(0).args[0]).to.eql(200);
      expect(jsonSpy.getCall(0).args[0].items).to.eql(items);

    });

  });

  describe('get', function() {

    afterEach(function() {
      if (contratoService.get.restore) contratoService.get.restore();
    });

    it('should call contratoService to get the contrato with the id specified in the params', function() {
      var mock = sinon.mock(contratoService);
      var req = {
        params: {
          id: '123'
        }
      };
      mock.expects('get').exactly(1).withArgs(req.params.id);

      contratoRoutes.get(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the contratoService when there is an error in the get call', function() {
      var _cb;
      var stub = sinon.stub(contratoService, 'get');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        }
      };

      contratoRoutes.get(req, null, nextSpy);
      _cb = stub.getCall(0).args[1];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call next with the error of not found 404 when the object return by the contratoService is null', function() {
      var _cb;
      var stub = sinon.stub(contratoService, 'get');
      var nextSpy = sinon.spy();

      var req = {
        params: {
          id: '123'
        }
      };

      contratoRoutes.get(req, null, nextSpy);
      _cb = stub.getCall(0).args[1];
      _cb(null, null);

      expect(nextSpy.getCall(0).args[0].status).to.eql(404);
    });

    it('should call res with status 200 and the propiedad when the contrato was returned successfuly', function() {

      var _cb;
      var stub = sinon.stub(contratoService, 'get');
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
      contratoRoutes.get(req, resObj, null);
      _cb = stub.getCall(0).args[1];
      var item = {
        _id: '123'
      };
      _cb(null, item);

      expect(resObj.status.getCall(0).args[0]).to.eql(200);
      expect(jsonSpy.getCall(0).args[0]._id).to.eql(item._id);
    });

  });

  describe('remove', function() {

    afterEach(function() {
      if (contratoService.remove.restore) contratoService.remove.restore();
    });

    it('should call contratoService to remove the contrato with the id specified in the params', function() {
      var mock = sinon.mock(contratoService);
      var req = {
        params: {
          id: '123'
        }
      };
      mock.expects('remove').exactly(1).withArgs(req.params.id);

      contratoRoutes.remove(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the contratoService when there is an error in the remove call', function() {
      var _cb;
      var stub = sinon.stub(contratoService, 'remove');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        }
      };

      contratoRoutes.remove(req, null, nextSpy);
      _cb = stub.getCall(0).args[1];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call res with status 200 when the contrato was removed successfuly', function() {

      var _cb;
      var stub = sinon.stub(contratoService, 'remove');
      var endfn = {
        end: function() {}
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
      contratoRoutes.remove(req, resObj, null);
      _cb = stub.getCall(0).args[1];

      _cb(null);

      expect(resObj.status.getCall(0).args[0]).to.eql(200);
      expect(endSpy.calledOnce).to.be.true;
    });

  });
  describe('update', function() {

    afterEach(function() {
      if (contratoService.update.restore) contratoService.update.restore();
    });

    it('should call contratoService to update the contrato with the id specified in the params', function() {
      var mock = sinon.mock(contratoService);
      var req = {
        params: {
          id: '123'
        },
        body: {
          nombre: 'santiago'
        }
      };
      mock.expects('update').exactly(1).withArgs(req.params.id, req.body);

      contratoRoutes.update(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the contratoService when there is an error in the update call', function() {
      var _cb;
      var stub = sinon.stub(contratoService, 'update');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        },
        body: {
          nombre:'santiago'
        }
      };

      contratoRoutes.update(req, null, nextSpy);
      _cb = stub.getCall(0).args[2];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call res with status 200 and the contrato when the contrato was updated successfuly', function() {

      var _cb;
      var stub = sinon.stub(contratoService, 'update');
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
        },
        body: {
          nombre:'santiago'
        }
      };
      contratoRoutes.update(req, resObj, null);
      _cb = stub.getCall(0).args[2];
      var item = {
        _id: '123'
      };
      _cb(null, item);

      expect(resObj.status.getCall(0).args[0]).to.eql(200);
      expect(jsonSpy.getCall(0).args[0]._id).to.eql(item._id);
    });

  });
});
