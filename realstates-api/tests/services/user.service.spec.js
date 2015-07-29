// jshint ignore: start

var userRepository = require('../../data/user.repository');
var userService = require('../../services/user.service');
var bcrypt = require('bcryptjs');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('userService', function() {

  describe('function declaration/definition', function() {
    it('should have create defined', function() {
      expect(userService.create).to.exist;
    });
    it('should have getAll defined', function() {
      expect(userService.getAll).to.exist;
    });
    it('should have get defined', function() {
      expect(userService.get).to.exist;
    });
    it('should have remove defined', function() {
      expect(userService.remove).to.exist;
    });
    it('shoud have update defined', function() {
      expect(userService.update).to.exist;
    });
  });

  describe('create', function() {

    afterEach(function() {
      if (bcrypt.hash.restore) bcrypt.hash.restore();
      if (userRepository.create.restore) userRepository.create.restore();
    });


    it('should call bscrypt with the users password when it is called', function() {
      var user = {
        userName: 'santiago',
        password: 'test'
      };

      var bcryptMock = sinon.mock(bcrypt);

      bcryptMock.expects('hash').withArgs('test').exactly(1);

      userService.create(user, function(e, obj) {});

      bcryptMock.verify();
    });

    it('should call create of the userRepository with a user of userName santiago when it is called with such a user', function() {
      var user = {
        userName: 'santiago'
      };

      var mock = sinon.mock(userRepository);
      var bcryptStub = sinon.stub(bcrypt, 'hash');

      mock.expects('create').withArgs(user).exactly(1);

      userService.create(user, function(e, obj) {});
      bcryptStub.getCall(0).args[2](null, 'test');

      mock.verify();
    });

    it('should call the cb with an error when there was an error while encrypting the password', function() {
      var user = {
        userName: 'santiago',
        password: 'test'
      };

      var error;

      var bcryptStub = sinon.stub(bcrypt, 'hash');

      userService.create(user, function(e, obj) {
        error = e;
      });
      bcryptStub.getCall(0).args[2]('unexpected error', null);

      expect(error).to.eql('unexpected error');
    });

    it('should call the cb with an error when there was an while creating the user', function() {
      var user = {
        userName: 'santiago',
        password: 'test'
      };

      var error;

      var bcryptStub = sinon.stub(bcrypt, 'hash');
      var userRepoStub = sinon.stub(userRepository, 'create');

      userService.create(user, function(e, obj) {
        error = e;
      });

      bcryptStub.getCall(0).args[2](null, 'test');
      userRepoStub.getCall(0).args[1]('unexpected error', null);

      expect(error).to.eql('unexpected error');
    });

    it('should call the cb with the created user when the user was created successfully', function() {
      var user = {
        userName: 'santiago',
        password: 'test'
      };

      var newUser;

      var bcryptStub = sinon.stub(bcrypt, 'hash');
      var userRepoStub = sinon.stub(userRepository, 'create');

      userService.create(user, function(e, obj) {
        newUser = obj;
      });

      bcryptStub.getCall(0).args[2](null, 'test');
      userRepoStub.getCall(0).args[1](null, {_id: 1});

      expect(newUser._id).to.eql(1);
    });

  });

  describe('getAll', function() {
    afterEach(function() {
      if (userRepository.getAll.restore) userRepository.getAll.restore();
    });

    it('should call getAll of the userRepository when it is called ', function() {

      var mock = sinon.mock(userRepository);
      mock.expects('getAll').exactly(1);

      userService.getAll(function(e, obj) {});

      mock.verify();
    });

    it('should call the cb function with an error when getAll returns an error', function() {

      var stub = sinon.stub(userRepository, 'getAll');
      var error = new Error('unexpected error');
      var inputCallbackSpy = sinon.spy();

      userService.getAll(inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[0](error, null);
      expect(inputCallbackSpy.getCall(0).args[0]).to.eql(error);
    });

    it('should call the cb function with the results returned by the repository when there are no errors', function() {

      var stub = sinon.stub(userRepository, 'getAll');
      var objs = [{
        _id: '123'
      }];
      var inputCallbackSpy = sinon.spy();

      userService.getAll(inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[0](null, objs);
      expect(inputCallbackSpy.getCall(0).args[1]).to.eql(objs);
    });
  });

  describe('get', function() {
    afterEach(function() {
      if (userRepository.get.restore) userRepository.get.restore();
    });

    it('should call get of the userRepository', function() {
      var id = 1;
      var mock = sinon.mock(userRepository);
      mock.expects('get').exactly(1).withArgs(id);

      userService.get(id, function(e, obj) {});

      mock.verify();
    });

    it('should call the cb function with an error when get returns an error', function() {
      var id = 1;

      var stub = sinon.stub(userRepository, 'get');
      var error = new Error('unexpected error');
      var inputCallbackSpy = sinon.spy();

      userService.get(id, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[1](error, null);
      expect(inputCallbackSpy.getCall(0).args[0]).to.eql(error);
    });

    it('should call the cb function with the results returned by the repository when there are no errors', function() {
      var id = 1;

      var stub = sinon.stub(userRepository, 'get');
      var obj = {
        _id: '123'
      };
      var inputCallbackSpy = sinon.spy();

      userService.get(id, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[1](null, obj);
      expect(inputCallbackSpy.getCall(0).args[1]).to.eql(obj);
    });
  });

  describe('remove', function() {
    afterEach(function() {
      if (userRepository.remove.restore) userRepository.remove.restore();
    });

    it('should call remove of the userRepository', function() {
      var id = 1;
      var mock = sinon.mock(userRepository);
      mock.expects('remove').exactly(1).withArgs(id);

      userService.remove(id, function(e, obj) {});

      mock.verify();
    });

    it('should call the cb function with an error when remove returns an error', function() {
      var id = 1;

      var stub = sinon.stub(userRepository, 'remove');
      var error = new Error('unexpected error');
      var inputCallbackSpy = sinon.spy();

      userService.remove(id, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[1](error, null);
      expect(inputCallbackSpy.getCall(0).args[0]).to.eql(error);
    });

    it('should call the cb function with a null error when there are no errors while removing the user', function() {
      var id = 1;

      var stub = sinon.stub(userRepository, 'remove');
      var obj = {
        _id: '123'
      };
      var inputCallbackSpy = sinon.spy();

      userService.remove(id, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[1](null, obj);
      expect(inputCallbackSpy.getCall(0).args[0]).to.be.null;
    });
  });

  describe('update', function() {
     afterEach(function() {
      if (bcrypt.hash.restore) bcrypt.hash.restore();
      if (userRepository.update.restore) userRepository.update.restore();
    });

    it('should call bcrypt with the users password when it is called', function() {
      var user = {
        userName: 'santiago',
        password: 'test'
      };

      var bcryptMock = sinon.mock(bcrypt);

      bcryptMock.expects('hash').withArgs('test').exactly(1);

      userService.update(1, user, function(e, obj) {});

      bcryptMock.verify();
    });

    it('should call update of the userRepository with a user of userName santiago when it is called with such a user', function() {
      var user = {
        userName: 'santiago'
      };

      var mock = sinon.mock(userRepository);
      var bcryptStub = sinon.stub(bcrypt, 'hash');

      mock.expects('update').withArgs(1, user).exactly(1);

      userService.update(1, user, function(e, obj) {});
      bcryptStub.getCall(0).args[2](null, 'test');

      mock.verify();
    });

    it('should call the cb with an error when there was an error while encrypting the password', function() {
      var user = {
        userName: 'santiago',
        password: 'test'
      };

      var error;

      var bcryptStub = sinon.stub(bcrypt, 'hash');

      userService.update(1, user, function(e, obj) {
        error = e;
      });
      bcryptStub.getCall(0).args[2]('unexpected error', null);

      expect(error).to.eql('unexpected error');
    });

    it('should call the cb with an error when there was an while creating the user', function() {
      var user = {
        userName: 'santiago',
        password: 'test'
      };

      var error;

      var bcryptStub = sinon.stub(bcrypt, 'hash');
      var userRepoStub = sinon.stub(userRepository, 'update');

      userService.update(1, user, function(e, obj) {
        error = e;
      });

      bcryptStub.getCall(0).args[2](null, 'test');
      userRepoStub.getCall(0).args[2]('unexpected error', null);

      expect(error).to.eql('unexpected error');
    });

    it('should call the cb with the updated user when the user was updated successfully', function() {
      var user = {
        userName: 'santiago',
        password: 'test'
      };

      var updatedUser;

      var bcryptStub = sinon.stub(bcrypt, 'hash');
      var userRepoStub = sinon.stub(userRepository, 'update');

      userService.update(1, user, function(e, obj) {
        updatedUser = obj;
      });

      bcryptStub.getCall(0).args[2](null, 'test');
      userRepoStub.getCall(0).args[2](null, {_id: 1});

      expect(updatedUser._id).to.eql(1);
    });
  });
});
