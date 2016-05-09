function getQueryMock(promise){
	return {
		exec: function(){
			return promise;
		}
	}
}

function getDocMock(obj, promise){
	return {
		toObject: function(){
			return obj;
		},
		save: function(){
		},
		set: function(){}
	};
}

module.exports = {
	getQueryMock: getQueryMock,
	getDocMock: getDocMock
};
