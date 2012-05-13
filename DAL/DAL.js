var database = require('./dbInit.js').init(),
	schemas = require('./schemas.js')(database);

global.dal = {
	//User Database Access
	User: {
		//Selects a User By it's Google Id
		selectById: function(googleId, everyAuthType, callback) {
			
			//Selects OAuth Info from User Database
			schemas.User.findOne({id: googleId}, function (err, userDoc) {
			
				if (userDoc)
				{
					var user = userDoc;
					
					//Selects Bofirial User Info from Player Database
					schemas.Player.findOne({_user: user}, function(err, playerDoc) {
						
						if (playerDoc)
						{
							user.playerName = playerDoc.playerName;
						}
						else
						{
							user.playerName = user.firstName + user.lastName;
						}
						
						callback(user);
					});
				}
				else
				{
					callback(null);
				}

			});
		},
		
		//Inserts a new User
		insert: function(user, callback) {
			var userSchema = new schemas.User(),
				playerSchema = new schemas.Player();
			
			//Stores OAUTH info in User Database
			userSchema.firstName = 		user.firstName;
			userSchema.lastName = 		user.lastName;
			userSchema.fullName = 		user.fullName;
			userSchema.email = 			user.email;
			userSchema.verifiedEmail = 	user.verifiedEmail;
			userSchema.id = 			user.id;
			
			userSchema.save(function() {
			
				//Stores Bofirial info in Player Database
				playerSchema.playerName = userSchema.firstName + userSchema.lastName;
				playerSchema.user = userSchema;
			
				playerSchema.save(callback);
			});
		}
	},
	
	GameLobby: {
		
	}

};
