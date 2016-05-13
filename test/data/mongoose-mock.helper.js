function getQueryMock(promise){
	return {
		exec: function(){
			return promise;
		}
	}
}

function getLeanQueryMock(promise){
	return {
		lean: function(){
			return getQueryMock(promise);
		},
	  populate: function(){
			return getLeanQueryMock(promise);
		}	
	};
}

function getDocMock(obj){
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
	getDocMock: getDocMock,
	getLeanQueryMock: getLeanQueryMock
};
