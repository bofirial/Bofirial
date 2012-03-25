var mongoose = require('mongoose'),
	configs = require('../configs/configs.js');

module.exports = {

	_db: null,
	
	//Initializes the Database
	init: function() {
		if (!module.exports._db) {
			//Pulls Database Path from the Config File.
			var path = configs('databaseConnection');
			
			console.log('connecting to database'.info);
			
			//Connect to the Database
			module.exports._db = mongoose.connect(path);
		}
		
		return module.exports._db;
	}
};
