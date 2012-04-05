
module.exports = function(database) { 

	//Game Lobby Schema
	var GameLobbySchema = new database.Schema(
		{
			gameName: String,
			private: Boolean,
			gameType: Number,
			
			owner: {type: database.Schema.ObjectId, ref: 'User'},
			players: [{type: database.Schema.ObjectId, ref: 'User'}],
			
			createdOn: {type: Date, default: Date.now},
			lastAccessedOn: {type: Date, default: Date.now}
		});

	database.model('GameLobby', GameLobbySchema);
	
	return database.model('GameLobby');
};
