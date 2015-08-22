'use strict';

describe('userService', function() {
  var userService,
    $httpBackend,
    urlConstants,
    $state;

  beforeEach(module('app'));

  beforeEach(inject(function(_$httpBackend_, _URL_, _$state_) {
    $httpBackend = _$httpBackend_;
    urlConstants = _URL_;
    $state = _$state_;
  }));

  afterEach(function() {
    $httpBackend = urlConstants = null;
  });

  describe('function definitios', function() {
    beforeEach(inject(function(_userService_) {
      userService = _userService_;
    }));
    afterEach(function() {
      userService = null;
    });

    it('should have get defined', function() {
      expect(userService.get).toBeDefined();
    });

    it('should have getAll defined', function() {
      expect(userService.getAll).toBeDefined();
    });

    it('should have create defined', function() {
      expect(userService.create).toBeDefined();
    });
    it('should have update defined', function() {
      expect(userService.update).toBeDefined();
    });
  });

  describe('getAll', function() {
    beforeEach(inject(function(_userService_) {
      userService = _userService_;
      spyOn($state, 'go').and.callFake(function() {});

    }));
    afterEach(function() {
      userService = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it("should return an empty array when there are no usuarios", function() {
      //arrange
      var fakeUsuarios = {
        items: []
      };
      var _usuarios;
      $httpBackend.whenGET(urlConstants.api + 'usuarios').respond(fakeUsuarios);
      //act
      userService.getAll().then(function(usuarios) {
        _usuarios = usuarios;
      });
      $httpBackend.flush();
      //assert
      expect(_usuarios.length).toBe(0);
    });

    it("should return a usuario when there is one usuario", function() {
      //arrange
      var fakeUsuarios = {
        items: [{
          _id: '123'
        }]
      };
      var _usuarios;
      $httpBackend.whenGET(urlConstants.api + 'usuarios').respond(fakeUsuarios);
      //act
      userService.getAll().then(function(usuarios) {
        _usuarios = usuarios;
      });
      $httpBackend.flush();
      //assert
      expect(_usuarios.length).toBe(1);
      expect(_usuarios[0]._id).toBe('123');
    });


    it("should return an error msg when there was an error while processing the getAll", function() {
      //arrange

      var _error;
      $httpBackend.whenGET(urlConstants.api + 'usuarios').respond(400, {
        message: 'unexpected error'
      });
      //act
      userService.getAll().then(null, function(err) {
        _error = err;
      });
      $httpBackend.flush();
      //assert
      expect(_error).toBe('unexpected error');
    });

  });

  describe('create', function() {
    beforeEach(inject(function(_userService_) {
      userService = _userService_;
      spyOn($state, 'go').and.callFake(function() {});

    }));
    afterEach(function() {
      userService = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });


    it("should return a user id when a usuario was created successfully", function() {
      //arrange
      var fakeUsuario = {
        _id: '123'
      };

      var _userId;
      $httpBackend.whenPOST(urlConstants.api + 'usuarios').respond(fakeUsuario);
      //act
      userService.create({}).then(function(userId) {
        _userId = userId;
      });
      $httpBackend.flush();
      //assert
      expect(_userId).toBe('123');
    });


    it("should return an error msg when there was an error while processing the getAll", function() {
      //arrange
      var _error;
      $httpBackend.whenPOST(urlConstants.api + 'usuarios').respond(400, {
        message: 'unexpected error'
      });
      //act
      userService.create({}).then(null, function(err) {
        _error = err;
      });
      $httpBackend.flush();
      //assert
      expect(_error).toBe('unexpected error');
    });

  });

  describe('get', function() {
    beforeEach(inject(function(_userService_) {
      userService = _userService_;
      spyOn($state, 'go').and.callFake(function() {});

    }));
    afterEach(function() {
      userService = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });


    it("should return a user when a usuario was found successfully", function() {
      //arrange
      var fakeUsuario = {
        _id: '1'
      };

      var _usuario;
      $httpBackend.whenGET(urlConstants.api + 'usuarios/1').respond(fakeUsuario);
      //act
      userService.get('1').then(function(usuario) {
        _usuario = usuario;
      });
      $httpBackend.flush();
      //assert
      expect(_usuario._id).toBe('1');
    });


    it("should return an error msg when there was an error while processing the getAll", function() {
      //arrange
      var _error;
      $httpBackend.whenGET(urlConstants.api + 'usuarios/1').respond(400, {
        message: 'unexpected error'
      });
      //act
      userService.get('1').then(null, function(err) {
        _error = err;
      });
      $httpBackend.flush();
      //assert
      expect(_error).toBe('unexpected error');
    });

  });

  describe('update', function() {
    beforeEach(inject(function(_userService_) {
      userService = _userService_;
      spyOn($state, 'go').and.callFake(function() {});

    }));
    afterEach(function() {
      userService = null;
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });


    it("should return a user when a usuario was updated successfully", function() {
      //arrange
      var userToUpdate = {
        _id: '1'
      };

      var _usuario;
      $httpBackend.whenPUT(urlConstants.api + 'usuarios/1').respond(userToUpdate);
      //act
      userService.update(userToUpdate).then(function(usuario) {
        _usuario = usuario;
      });
      $httpBackend.flush();
      //assert
      expect(_usuario._id).toBe('1');
    });


    it("should return an error msg when there was an error while updating the usuario", function() {
      //arrange
      var userToUpdate = {
        _id: '1'
      };
      var _error;
      $httpBackend.whenPUT(urlConstants.api + 'usuarios/1').respond(400, {
        message: 'unexpected error'
      });
      //act
      userService.update(userToUpdate).then(null, function(err) {
        _error = err;
      });
      $httpBackend.flush();
      //assert
      expect(_error).toBe('unexpected error');
    });

  });
});
