// jshint ignore: start

var pagoService = require('../../services/pago.service');
var pagoRoutes = require('../../routes/pagos/pago.routes');
var sinon = require('sinon');
var expect = require('chai').expect;

describe('pagoRoutes', function() {

  describe('function declarations', function() {
    it('should have post defined', function() {
      expect(pagoRoutes.post).to.exist;
    });
    it('should have get defined', function() {
      expect(pagoRoutes.get).to.exist;
    });
    it('should have getAll defined', function() {
      expect(pagoRoutes.getAll).to.exist;
    });
    it('should have remove defined', function() {
      expect(pagoRoutes.remove).to.exist;
    });
    it('should have update defined', function() {
      expect(pagoRoutes.update).to.exist;
    });
  });

  describe('post', function() {

    afterEach(function() {
      if (pagoService.create.restore) {
        pagoService.create.restore();
      }
    });

    it('should call pagoService with the body of the request', function() {
      var mock = sinon.mock(pagoService);
      var req = {
        body: {}
      };
      mock.expects('create').exactly(1).withArgs(req.body);

      pagoRoutes.post(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the pagoService when there is an error in the creation of a pago', function() {
      var _cb;
      var stub = sinon.stub(pagoService, 'create');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        body: {}
      };

      pagoRoutes.post(req, null, nextSpy);
      _cb = stub.getCall(0).args[1];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call res with status 200 and the id provided when the pago was successfuly created', function() {
      var _cb;
      var stub = sinon.stub(pagoService, 'create');
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
      pagoRoutes.post(req, resObj, null);
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
      if (pagoService.getAll.restore) pagoService.getAll.restore();
    });

    it('should call pagoService to get all the pagos when it is called', function() {
      var mock = sinon.mock(pagoService);
      var req = {
        body: {}
      };
      mock.expects('getAll').exactly(1);

      pagoRoutes.getAll(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the pagoService when there is an error in the getAll call', function() {
      var _cb;
      var stub = sinon.stub(pagoService, 'getAll');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        body: {}
      };

      pagoRoutes.getAll(req, null, nextSpy);
      _cb = stub.getCall(0).args[0];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call res with status 200 and the items provided when the pagos were returned successfuly', function() {
      var _cb;
      var stub = sinon.stub(pagoService, 'getAll');
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
          contratoid: '1'
        }
      };
      pagoRoutes.getAll(req, resObj, null);
      _cb = stub.getCall(0).args[0];
      var items = [{
        _id: '123',
        contrato: '1'
      }];
      _cb(null, items);

      expect(resObj.status.getCall(0).args[0]).to.eql(200);
      expect(jsonSpy.getCall(0).args[0].items).to.eql(items);

    });

    it('should only returns the pagos associated with the contrato that is part of the request', function() {
      var _cb;
      var stub = sinon.stub(pagoService, 'getAll');
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
          contratoid: '1'
        }
      };
      pagoRoutes.getAll(req, resObj, null);
      _cb = stub.getCall(0).args[0];

      var items = [{
        _id: '123',
        contrato: '2'
      }, {
        _id: '124',
        contrato: '1'
      }];

      _cb(null, items);

      expect(jsonSpy.getCall(0).args[0].items.length).to.eql(1);
      expect(jsonSpy.getCall(0).args[0].items[0]._id).to.eql('124');
    });
  });

  describe('get', function() {

    afterEach(function() {
      if (pagoService.get.restore) pagoService.get.restore();
    });

    it('should call pagoService to get the pago with the id specified in the params', function() {
      var mock = sinon.mock(pagoService);
      var req = {
        params: {
          id: '123'
        }
      };
      mock.expects('get').exactly(1).withArgs(req.params.id);

      pagoRoutes.get(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the pagoService when there is an error in the get call', function() {
      var _cb;
      var stub = sinon.stub(pagoService, 'get');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        }
      };

      pagoRoutes.get(req, null, nextSpy);
      _cb = stub.getCall(0).args[1];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call next with the error of not found 404 when the object return by the pagoService is null', function() {
      var _cb;
      var stub = sinon.stub(pagoService, 'get');
      var nextSpy = sinon.spy();

      var req = {
        params: {
          id: '123'
        }
      };

      pagoRoutes.get(req, null, nextSpy);
      _cb = stub.getCall(0).args[1];
      _cb(null, null);

      expect(nextSpy.getCall(0).args[0].status).to.eql(404);
    });

    it('should call res with status 200 and the propiedad when the pago was returned successfuly', function() {

      var _cb;
      var stub = sinon.stub(pagoService, 'get');
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
      pagoRoutes.get(req, resObj, null);
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
      if (pagoService.remove.restore) pagoService.remove.restore();
    });

    it('should call pagoService to remove the pago with the id specified in the params', function() {
      var mock = sinon.mock(pagoService);
      var req = {
        params: {
          id: '123'
        }
      };
      mock.expects('remove').exactly(1).withArgs(req.params.id);

      pagoRoutes.remove(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the pagoService when there is an error in the remove call', function() {
      var _cb;
      var stub = sinon.stub(pagoService, 'remove');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        }
      };

      pagoRoutes.remove(req, null, nextSpy);
      _cb = stub.getCall(0).args[1];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call res with status 200 when the pago was removed successfuly', function() {

      var _cb;
      var stub = sinon.stub(pagoService, 'remove');
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
      pagoRoutes.remove(req, resObj, null);
      _cb = stub.getCall(0).args[1];

      _cb(null);

      expect(resObj.status.getCall(0).args[0]).to.eql(200);
      expect(endSpy.calledOnce).to.be.true;
    });

  });
  describe('update', function() {

    afterEach(function() {
      if (pagoService.update.restore) pagoService.update.restore();
    });

    it('should call pagoService to update the pago with the id specified in the params', function() {
      var mock = sinon.mock(pagoService);
      var req = {
        params: {
          id: '123'
        },
        body: {
          importe: 123
        }
      };
      mock.expects('update').exactly(1).withArgs(req.params.id, req.body);

      pagoRoutes.update(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the pagoService when there is an error in the update call', function() {
      var _cb;
      var stub = sinon.stub(pagoService, 'update');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        },
        body: {
          importe: 123
        }
      };

      pagoRoutes.update(req, null, nextSpy);
      _cb = stub.getCall(0).args[2];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call res with status 200 and the pago when the pago was updated successfuly', function() {

      var _cb;
      var stub = sinon.stub(pagoService, 'update');
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
          importe: 123
        }
      };
      pagoRoutes.update(req, resObj, null);
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
