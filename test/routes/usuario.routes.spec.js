// jshint ignore: start

var userService = require('../../services/user.service');
var userRoutes = require('../../routes/usuarios/usuario.routes');
var logger = require('../../helpers/logger');
var sinon = require('sinon');
var expect = require('chai').expect;

describe('userRoutes', function() {

  before(function() {
    sinon.stub(logger, 'info');
    sinon.stub(logger, 'error');
  });

  after(function() {
    logger.error.restore();
    logger.info.restore();
  });

  describe('post', function() {

    afterEach(function() {
      if (userService.create.restore) {
        userService.create.restore();
      }
    });

    it('should call userService create when is called with the information provided', function() {
      var mock = sinon.mock(userService);
      var req = {
        body: {}
      };
      mock.expects('create').exactly(1).withArgs(req.body);

      userRoutes.post(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the userService when there is an error in the creation of a user', function() {
      var _cb;
      var stub = sinon.stub(userService, 'create');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        body: {}
      };

      userRoutes.post(req, null, nextSpy);
      _cb = stub.getCall(0).args[1];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call res with status 200 and the id provided when the user was successfuly created', function() {
      var _cb;
      var stub = sinon.stub(userService, 'create');
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
      userRoutes.post(req, resObj, null);
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
      if (userService.getAll.restore) userService.getAll.restore();
    });

    it('should call userService to get all the users when it is called', function() {
      var mock = sinon.mock(userService);
      var req = {
        body: {}
      };
      mock.expects('getAll').exactly(1);

      userRoutes.getAll(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the userService when there is an error in the getAll call', function() {
      var _cb;
      var stub = sinon.stub(userService, 'getAll');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        body: {}
      };

      userRoutes.getAll(req, null, nextSpy);
      _cb = stub.getCall(0).args[0];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call res with status 200 and the items provided when the users were returned successfuly', function() {
      var _cb;
      var stub = sinon.stub(userService, 'getAll');
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
      userRoutes.getAll(req, resObj, null);
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
      if (userService.get.restore) userService.get.restore();
    });

    it('should call userService to get the user with the id specified in the params', function() {
      var mock = sinon.mock(userService);
      var req = {
        params: {
          id: '123'
        }
      };
      mock.expects('get').exactly(1).withArgs(req.params.id);

      userRoutes.get(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the userService when there is an error in the get call', function() {
      var _cb;
      var stub = sinon.stub(userService, 'get');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        }
      };

      userRoutes.get(req, null, nextSpy);
      _cb = stub.getCall(0).args[1];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call next with the error of not found 404 when the object return by the userService is null', function() {
      var _cb;
      var stub = sinon.stub(userService, 'get');
      var nextSpy = sinon.spy();

      var req = {
        params: {
          id: '123'
        }
      };

      userRoutes.get(req, null, nextSpy);
      _cb = stub.getCall(0).args[1];
      _cb(null, null);

      expect(nextSpy.getCall(0).args[0].status).to.eql(404);
    });

    it('should call res with status 200 and the propiedad when the user was returned successfuly', function() {

      var _cb;
      var stub = sinon.stub(userService, 'get');
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
      userRoutes.get(req, resObj, null);
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
      if (userService.remove.restore) userService.remove.restore();
    });

    it('should call userService to remove the user with the id specified in the params', function() {
      var mock = sinon.mock(userService);
      var req = {
        params: {
          id: '123'
        }
      };
      mock.expects('remove').exactly(1).withArgs(req.params.id);

      userRoutes.remove(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the userService when there is an error in the remove call', function() {
      var _cb;
      var stub = sinon.stub(userService, 'remove');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        }
      };

      userRoutes.remove(req, null, nextSpy);
      _cb = stub.getCall(0).args[1];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call res with status 200 when the user was removed successfuly', function() {

      var _cb;
      var stub = sinon.stub(userService, 'remove');
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
      userRoutes.remove(req, resObj, null);
      _cb = stub.getCall(0).args[1];

      _cb(null);

      expect(resObj.status.getCall(0).args[0]).to.eql(200);
      expect(endSpy.calledOnce).to.be.true;
    });

  });
  describe('update', function() {

    afterEach(function() {
      if (userService.update.restore) userService.update.restore();
    });

    it('should call userService to update the user with the id specified in the params', function() {
      var mock = sinon.mock(userService);
      var req = {
        params: {
          id: '123'
        },
        body: {
          nombre: 'santiago'
        }
      };
      mock.expects('update').exactly(1).withArgs(req.params.id, req.body);

      userRoutes.update(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the userService when there is an error in the update call', function() {
      var _cb;
      var stub = sinon.stub(userService, 'update');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        },
        body: {
          nombre: 'santiago'
        }
      };

      userRoutes.update(req, null, nextSpy);
      _cb = stub.getCall(0).args[2];
      _cb(error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call res with status 200 and the user when the user was updated successfuly', function() {

      var _cb;
      var stub = sinon.stub(userService, 'update');
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
          nombre: 'santiago'
        }
      };
      userRoutes.update(req, resObj, null);
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
