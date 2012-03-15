
module.exports = function(database) { 

	var GameSchema = new database.Schema(
		{
			firstName: String,
			lastName: String,
			fullName: String,
			email: String,
			id: Number,
			verifiedEmail: Boolean,
			registeredOn: {type: Date, default: Date.now}
		});

	database.model('Game', GameSchema);
	
	return database.model('Game');
};
