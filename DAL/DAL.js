var database = require('./dbInit.js').init(),
	schemas = require('./schemas.js')(database);

global.dal = {
	//User Database Access
	User: {
		//Selects a User By it's Google Id
		selectById: function(googleId, everyAuthType, callback) {
		
			schemas.User.findOne({id: googleId}, function (err, docs) {
			
				if (docs.length > 0)
				{
					//CONSIDER: Might want to update user data if its changed.
				
					callback.call(null, docs[0]);
				}

			});
		},
		
		//Inserts a new User
		insert: function(user, callback) {
			var userSchema = new schemas.User();
			
			userSchema.firstName = 		user.firstName;
			userSchema.lastName = 		user.lastName;
			userSchema.fullName = 		user.fullName;
			userSchema.email = 			user.email;
			userSchema.verifiedEmail = 	user.verifiedEmail;
			userSchema.id = 			user.id;
			
			userSchema.save(callback);
		}
	},
	
	//Player Database Access
	Player: {
		selectByUserId: function(userId, callback) {
			schemas.Player.findOne({_user: userId}, callback);
		}
	},
	
	GameLobby: {
		
	}

};
