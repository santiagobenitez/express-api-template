var dbUrl = 'mongodb://@127.0.0.1:27017/testbienesraices';
var mongoose = require('mongoose');
var expect = require('chai').expect;
var userRepository = require('../../data/user.repository');


var newUser = {
  userName: 'test',
  password: 'test2',
  passwordHash: 'asdasdasdasdasd',
  activo: true
};

describe('userRepository', function() {
  before(function() {
    mongoose.connect(dbUrl);
  });
  after(function() {
    mongoose.connection.db.dropDatabase();
    mongoose.disconnect();
  });

  describe('create', function() {
    it('should create a new user when it is a valid user', function(done) {

      userRepository.create(newUser, function(e, obj) {
        expect(e).to.be.null;
        expect(obj).to.exist;
        newUser._id = obj._id;
        done();
      })
    });

    it('should return an error object when the passwordHash property is not specified', function(done) {
      var newUser = {
        userName: 'test',
        activo: true
      };

      userRepository.create(newUser, function(e, obj) {
        expect(e).not.to.be.null;
        expect(e.passwordHash.message).to.exist;
        done();
      });
    });
  });

  describe('getAll', function() {
    it('should return the recently created user as part of the result', function(done) {

      userRepository.getAll(function(e, objs) {
        expect(e).to.be.null;
        expect(objs).to.have.length.above(0);
        expect(objs.map(function(item) {
          return item._id
        })).to.contain(newUser._id);
        done();
      });
    });
  });

  describe('get', function() {
    it('should return the recently created user as part of the result', function(done) {

      userRepository.get(newUser._id, function(e, obj) {
        expect(obj._id).to.eql(newUser._id);
        done();
      });
    });

    it('should return an error when the id is invalid', function(done) {
      userRepository.get(newUser._id + "a", function(e, obj) {
        expect(e).to.exist;
        done();
      });
    });

    it('should return null when the id is valid but the object was not found', function(done) {
      // 556c217f3bb8bc6017a8f2e8
      userRepository.get('556c217f3bb8bc6017a8f2e5', function(e, obj) {
        expect(obj).to.be.null;
        done();
      });

    })
  });

  describe('getByUserName', function() {
    it('should return the recently created user as part of the result', function(done) {

      userRepository.getByUserName(newUser.userName, function(e, obj) {
        expect(obj._id).to.eql(newUser._id);
        done();
      });
    });

    it('should return null when the there is not a user with such a userName', function(done) {
      // 556c217f3bb8bc6017a8f2e8
      userRepository.getByUserName('santiago', function(e, obj) {
        expect(obj).to.be.null;
        done();
      });

    });
  });

  describe('update', function() {
    it('should update the user when the password and userName are modified', function(done) {
      newUser.passwordHash = 'testEdit'
      newUser.userName = 'userNameEdit';

      userRepository.update(newUser._id, newUser, function(e, obj) {
        expect(e).to.be.null;
        newUser = obj;
        expect(newUser.passwordHash).to.eql('testEdit');
        expect(newUser.userName).to.eql('userNameEdit');
        done();
      });
    });

    it('should return an error when the id doest exist', function(done) {
      userRepository.update(newUser._id + 'a', newUser, function(e, obj) {
        expect(e).to.exist;
        done();
      });
    });
  });


  describe('remove', function() {
    it('should return an error when the object was not removed', function(done) {
      userRepository.remove(newUser._id + "a", function(e) {
        expect(e).to.exist;
        done();
      });
    })

    it('should return a null error when the recently created user was removed successfuly', function(done) {
      userRepository.remove(newUser._id, function(e) {
        expect(e).to.be.null;
        done();
      });
    });
  });



});
