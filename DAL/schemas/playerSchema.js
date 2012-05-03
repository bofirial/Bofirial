module.exports = function(database) { 

	//Player Schema
	var PlayerSchema = new database.Schema(
		{
			playerName: String,
			
			user: {type: database.Schema.ObjectId, ref: 'User'}
		});

	database.model('Player', PlayerSchema);
	
	return database.model('Player');
};
