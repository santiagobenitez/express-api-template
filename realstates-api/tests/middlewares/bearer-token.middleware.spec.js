var logger = require('../../helpers/logger');

var sinon = require('sinon');
var expect = require('chai').expect;

var bearerToken = require('../../middlewares/bearer-token.middleware');
var jwt = require('jsonwebtoken');

describe('bearerToken', function() {

  afterEach(function() {
    if (jwt.verify.restore) jwt.verify.restore();
  });

  it('should call next with an error when authorization header is not present', function() {
    var req = {
      headers: {

      }
    }

    var nextSpy = sinon.spy();

    bearerToken()(req, null, nextSpy);

    expect(nextSpy.calledOnce).to.be.true;
  });

  it('should call next with an error of status 403 when authorization header is not present', function() {
    var req = {
      headers: {

      }
    }

    var nextSpy = sinon.spy();

    bearerToken()(req, null, nextSpy);

    expect(nextSpy.getCall(0).args[0].status).to.eql(403);
  });

  it('should call next with an error of status 403 when authorization header is present but the schema is not Bearer', function() {
    var req = {
      headers: {
        authorization: 'falsetoken'
      }
    }

    var nextSpy = sinon.spy();

    bearerToken()(req, null, nextSpy);

    expect(nextSpy.getCall(0).args[0].status).to.eql(403);
  });

  it('should call next with an error of status 400 when authorization header is present but the schema is not Bearer', function() {
    var req = {
      headers: {
        authorization: 'falsetoken'
      }
    }

    var nextSpy = sinon.spy();

    bearerToken()(req, null, nextSpy);

    expect(nextSpy.getCall(0).args[0].status).to.eql(403);
  });

  it('should call next with an error of invalid_token when jwt fails to verify the token', function() {

    var jwtStub = sinon.stub(jwt, 'verify');

    var req = {
      headers: {
        authorization: 'Bearer asdb1231asd21'
      }
    };

    var nextSpy = sinon.spy();

    bearerToken()(req, null, nextSpy);

    jwtStub.getCall(0).args[2](new Error('error while decoding'), null);

    expect(nextSpy.getCall(0).args[0]).to.not.be.empty;
  });

  it('should call next with empty args when jwt verfied succesfully the token', function() {

    var jwtStub = sinon.stub(jwt, 'verify');

    var req = {
      headers: {
        authorization: 'Bearer asdb1231asd21'
      }
    };

    var nextSpy = sinon.spy();

    bearerToken()(req, null, nextSpy);

    jwtStub.getCall(0).args[2](null, {});

    expect(nextSpy.getCall(0).args.length).to.eql(0);
  });

  it('should add to the req object a user object with the decoded token when jwt verfied succesfully the token', function() {

    var jwtStub = sinon.stub(jwt, 'verify');

    var req = {
      headers: {
        authorization: 'Bearer asdb1231asd21'
      }
    };

    bearerToken()(req, null, function() {});

    jwtStub.getCall(0).args[2](null, {userName: 'test'});

    expect(req.user.userName).to.eql('test');
  });

});
