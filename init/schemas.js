
module.exports = function(database) {
	return {
		User: require('./database/userSchema.js')(database)
	};
}
