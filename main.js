var colorThemes = require('./init/colorsInit.js').init(),
	database = require('./init/dbInit.js').init(),
	app = require('./init/expressInit.js').init(database);

app.get('/', function(req, res) {
	res.render('root');
});

app.listen(80);

/* DB CODE TEST
var UserSchema = new database.Schema({
	username: String,
	password: String,
	registeredOn: (type: Date, default: Date.now}
});

database.model('User', UserSchema);

var User = database.model('User');

var user = new User();

user.username = 'James';
user.password = '12345';
user.registeredOn = new Date(2012, 01, 15);

console.log(user);

user.save(function(e) {
	if (e)
	{
		console.log('DB Error'.error);
	}
	console.log('Saved in Database'.debug);
	database.disconnect();
});

console.log('end');*/
