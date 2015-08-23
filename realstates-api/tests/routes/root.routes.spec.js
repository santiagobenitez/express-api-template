var userService = require('../../services/user.service');
var rootRoutes = require('../../routes/root/root.routes');
var logger = require('../../helpers/logger');

var sinon = require('sinon');
var expect = require('chai').expect;

describe('rootRoutes', function() {
  before(function() {
    sinon.stub(logger, 'info');
    sinon.stub(logger, 'error');
  });

  after(function() {
    logger.error.restore();
    logger.info.restore();
  });

  describe('authenticate', function() {

    afterEach(function() {
      if (userService.getByCredentials.restore) userService.getByCredentials.restore();
    });

    it('should call userService to get the user with the userName specified in the params', function() {
      var mock = sinon.mock(userService);
      var req = {
        body: {
          userName: 'santiago',
          password: 'password'
        }
      };

      mock.expects('getByCredentials').exactly(1).withArgs(req.body.userName, req.body.password);

      rootRoutes.authenticate(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the userService when there is an error in the get call', function() {

      var _cb;
      var stub = sinon.stub(userService, 'getByCredentials');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        body: {
          userName: 'santiago',
          password: 'password'
        }
      };

      rootRoutes.authenticate(req, null, nextSpy);
      stub.getCall(0).args[2](error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call next with the error of not found 400 when the object return by the userService is null', function() {
      var _cb;
      var stub = sinon.stub(userService, 'getByCredentials');
      var nextSpy = sinon.spy();

      var req = {
        body: {
          userName: 'santiago',
          password: 'password'
        }
      };

      rootRoutes.authenticate(req, null, nextSpy);
      _cb = stub.getCall(0).args[2](null, null);

      expect(nextSpy.getCall(0).args[0].status).to.eql(400);
    });

    it('should return a json with an access_token in the body when the user was returned successfuly', function() {

      var _cb;
      var stub = sinon.stub(userService, 'getByCredentials');
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
        body: {
          userName: 'santiago',
          password: 'password'
        }
      };

      rootRoutes.authenticate(req, resObj, null);
      _cb = stub.getCall(0).args[2](null, {
        _id: '123',
        userName: 'santiago'
      });

      expect(jsonSpy.getCall(0).args[0].access_token).to.not.be.empty;
    });

    it('should return a json with an refresh_token in the body when the user was returned successfuly', function() {

      var _cb;
      var stub = sinon.stub(userService, 'getByCredentials');
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
        body: {
          userName: 'santiago',
          password: 'password'
        }
      };

      rootRoutes.authenticate(req, resObj, null);
      _cb = stub.getCall(0).args[2](null, {
        _id: '123',
        userName: 'santiago'
      });

      expect(jsonSpy.getCall(0).args[0].refresh_token).to.not.be.empty;
    });

    it('should return a json with with the scopes of the user in the body when the user was returned successfuly', function() {

      var _cb;
      var stub = sinon.stub(userService, 'getByCredentials');
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
        body: {
          userName: 'santiago',
          password: 'password'
        }
      };

      rootRoutes.authenticate(req, resObj, null);
      _cb = stub.getCall(0).args[2](null, {
        _id: '123',
        userName: 'santiago'
      });

      expect(jsonSpy.getCall(0).args[0].scopes).to.not.be.empty;
    });

  });
});
