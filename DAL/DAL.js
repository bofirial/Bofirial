var database = require('./dbInit.js').init(),
	schemas = require('./schemas.js')(database);

module.exports = {
	//User Database Access
	User: {
		//Selects a User By it's Google Id
		selectById: function(userId, callback) {
			schemas.User.find({id: userId}, callback);
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
	}

};
