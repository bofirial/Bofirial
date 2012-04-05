//Initializes the Database Schemas
module.exports = function(database) {
	return {
		//User Schema
		User: require('./schemas/userSchema.js')(database),
		//Game Lobby Schema
		GameLobby: require('./schemas/gameLobbySchema.js')(database)
	};
}
