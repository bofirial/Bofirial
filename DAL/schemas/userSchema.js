module.exports = function(database) { 

	//User Schema
	var UserSchema = new database.Schema(
		{
			firstName: String,
			lastName: String,
			fullName: String,
			email: String,
			
			//Google Id for the User.  Must be Unique
			id: { type: Number, unique: true },
			
			verifiedEmail: Boolean,
			
			//Records the Time the User was Registered
			registeredOn: {type: Date, default: Date.now}
		});

	database.model('User', UserSchema);
	
	return database.model('User');
};
