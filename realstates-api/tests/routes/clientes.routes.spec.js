// jshint ignore: start

var clienteService = require('../../services/cliente.service');
var clienteRoutes = require('../../routes/clientes/cliente.routes');
var sinon = require('sinon');
var expect = require('chai').expect;

describe('clienteRoutes', function() {

  describe('function declarations', function() {
    it('should have post defined', function() {
      expect(clienteRoutes.post).to.exist;
    });
    it('should have get defined', function() {
      expect(clienteRoutes.get).to.exist;
    });
    it('should have getAll defined', function() {
      expect(clienteRoutes.getAll).to.exist;
    });
    it('should have remove defined', function() {
      expect(clienteRoutes.remove).to.exist;
    });
  });

  describe('post', function() {

    afterEach(function() {
      if (clienteService.create.restore) {
        clienteService.create.restore();
      }
    });

    it('should call clienteService create when is called with the information provided', function() {
      var mock = sinon.mock(clienteService);
      var req = {
        body: {}
      };
      mock.expects('create').exactly(1).withArgs(req.body);

      clienteRoutes.post(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the clienteService when there is an error in the creation of a cliente', function() {
      var _cb;
      var stub = sinon.stub(clienteService, 'create');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        body: {}
      };

      clienteRoutes.post(req, null, nextSpy);
      _cb = stub.getCall(0).args[1];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call res with status 200 and the id provided when the cliente was successfuly created', function() {
      var _cb;
      var stub = sinon.stub(clienteService, 'create');
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
      clienteRoutes.post(req, resObj, null);
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
      if (clienteService.getAll.restore) clienteService.getAll.restore();
    });

    it('should call clienteService to get all the clientes when it is called', function() {
      var mock = sinon.mock(clienteService);
      var req = {
        body: {}
      };
      mock.expects('getAll').exactly(1);

      clienteRoutes.getAll(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the clienteService when there is an error in the getAll call', function() {
      var _cb;
      var stub = sinon.stub(clienteService, 'getAll');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        body: {}
      };

      clienteRoutes.getAll(req, null, nextSpy);
      _cb = stub.getCall(0).args[0];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call res with status 200 and the items provided when the clientes were returned successfuly', function() {
      var _cb;
      var stub = sinon.stub(clienteService, 'getAll');
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
      clienteRoutes.getAll(req, resObj, null);
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
      if (clienteService.get.restore) clienteService.get.restore();
    });

    it('should call clienteService to get the cliente with the id specified in the params', function() {
      var mock = sinon.mock(clienteService);
      var req = {
        params: {
          id: '123'
        }
      };
      mock.expects('get').exactly(1).withArgs(req.params.id);

      clienteRoutes.get(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the clienteService when there is an error in the get call', function() {
      var _cb;
      var stub = sinon.stub(clienteService, 'get');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        }
      };

      clienteRoutes.get(req, null, nextSpy);
      _cb = stub.getCall(0).args[1];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call next with the error of not found 404 when the object return by the clienteService is null', function() {
      var _cb;
      var stub = sinon.stub(clienteService, 'get');
      var nextSpy = sinon.spy();

      var req = {
        params: {
          id: '123'
        }
      };

      clienteRoutes.get(req, null, nextSpy);
      _cb = stub.getCall(0).args[1];
      _cb(null, null);

      expect(nextSpy.getCall(0).args[0].status).to.eql(404);
    });

    it('should call res with status 200 and the propiedad when the cliente was returned successfuly', function() {

      var _cb;
      var stub = sinon.stub(clienteService, 'get');
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
      clienteRoutes.get(req, resObj, null);
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
      if (clienteService.remove.restore) clienteService.remove.restore();
    });

    it('should call clienteService to remove the cliente with the id specified in the params', function() {
      var mock = sinon.mock(clienteService);
      var req = {
        params: {
          id: '123'
        }
      };
      mock.expects('remove').exactly(1).withArgs(req.params.id);

      clienteRoutes.remove(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the clienteService when there is an error in the remove call', function() {
      var _cb;
      var stub = sinon.stub(clienteService, 'remove');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        }
      };

      clienteRoutes.remove(req, null, nextSpy);
      _cb = stub.getCall(0).args[1];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call res with status 200 when the cliente was removed successfuly', function() {

      var _cb;
      var stub = sinon.stub(clienteService, 'remove');
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
      clienteRoutes.remove(req, resObj, null);
      _cb = stub.getCall(0).args[1];

      _cb(null);

      expect(resObj.status.getCall(0).args[0]).to.eql(200);
      expect(endSpy.calledOnce).to.be.true;
    });

  });
});
