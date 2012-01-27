
module.exports = function(database) { 

	var UserSchema = new database.Schema({
		firstName: String,
		lastName: String,
		fullName: String,
		email: String,
		id: Number,
		verifiedEmail: Boolean,
		registeredOn: {type: Date, default: Date.now}
	});

	database.model('User', UserSchema);
	
	return database.model('User');
};
