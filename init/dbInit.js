var mongoose = require('mongoose');

module.exports = {

	_db: null,
	
	init: function() {
		if (!module.exports._db) {
			var path = 'mongodb://db.jschafer.net:27017/Bofirial';
			console.log('connecting to database'.info);
			module.exports._db = mongoose.connect(path);
		}
		
		return module.exports._db;
	}
}
