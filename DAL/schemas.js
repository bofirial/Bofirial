//Initializes the Database Schemas
module.exports = function(database) {
	return {
		//User Schema
		User: require('./schemas/userSchema.js')(database),
		//Game Schema
		Game: require('./schemas/gameSchema.js')(database)
	};
}
