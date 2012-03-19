var environment = require('./environment.js'),
	
	configs = {
		
		databaseConnection: {
			development: 'mongodb://db.jschafer.net:27017/Bofirial',
			production: 'mongodb://db.jschafer.net:27017/Bofirial'
		}
	};

//Returns the Config setting for the current environment
module.exports = function(key) {
	return configs[key][environment];
};
