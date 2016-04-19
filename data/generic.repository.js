'use strict';

function GenericRepository(model) {
	this.model = model;
}

GenericRepository.prototype.create = function(newObj) {
	return this.model.create(newObj).then(function(doc){
		return doc.toObject();
	});
};

GenericRepository.prototype.get = function(id) {
	return this.model.findById(id).exec().then(function(doc) {
		return doc.toObject();
	});
};

GenericRepository.prototype.getAll = function() {
	return this.model.find().lean().exec().then(function(objs) {
		return objs;
	});
};

GenericRepository.prototype.remove = function(id) {
	return this.model.findByIdAndRemove(id).exec();
};

GenericRepository.prototype.update = function(id, obj) {
	delete obj._id;
	return this.model.findById(id).then(function(doc) {
		doc.set(obj);
		return  doc.save().then(function(updated_doc) {
			return updated_doc.toObject();
		});
	});
};

module.exports = GenericRepository;
