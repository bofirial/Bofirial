
module.exports = function(database) { 

	var UserSchema = new database.Schema(
		{
			firstName: String,
			lastName: String,
			fullName: String,
			email: String,
			id: { type: Number, unique: true },
			verifiedEmail: Boolean,
			registeredOn: {type: Date, default: Date.now}
		});

	database.model('User', UserSchema);
	
	return database.model('User');
};
