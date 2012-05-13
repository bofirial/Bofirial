var express = require('express'),
	MemoryStore = express.session.MemoryStore,
	app = express.createServer(),
	sessionStore = new MemoryStore(),
	everyauth = require('everyauth');

//Google Login Handling
everyauth.google
	.appId('1089135435768.apps.googleusercontent.com')
	.appSecret('SPh1akml61UxCKtwEkCywTNR')
	.scope('https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email')
	.handleAuthCallbackError( function(req, res) {
		console.log('handleAuthCallbackError');
	})
	//Builds the User Object after Google Login
	.findOrCreateUser( function(session, accessToken, accessTokenExtra, googleUserMetadata) {
		var promise = this.Promise();
		
		//Selects the User from the Database
		dal.User.selectById(googleUserMetadata.id, types.everyAuthTypes.google, function (user) {
			if (user)
			{
				//CONSIDER: Might want to update user data if its changed.
				
				console.log(('User: ' + user.fullName + ' logged in!').connection);
				
			} else {
				//Inserts the New User into the Database
				
				user = {
					firstName: googleUserMetadata.given_name,
					lastName: googleUserMetadata.family_name,
					fullName: googleUserMetadata.name,
					email: googleUserMetadata.email,
					verifiedEmail: googleUserMetadata.verified_email,
					id: googleUserMetadata.id
				}
				
				dal.User.insert(user, function (err) {
					console.log(('New User: ' + user.fullName + ' saved!').connection);
				});
			}
			
			session.user = user;
			
			promise.fulfill(user);
		});
		
		return promise;
		
	})
	.redirectPath('/');

//Builds the User Object from the userId
everyauth.everymodule.findUserById( function (userId, callback) {
		
		//Selects the User from the Database
		dal.User.selectById(userId, types.everyAuthTypes.google, function (user) {
			
			callback(null, user);
		});
	});

//Express Settings
app.configure(function() {
	app.use(express.static(__dirname + '/../public'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({
		store: sessionStore,
		secret: "abcdefgh",
		key: 'express.sid'
		}));
	app.use(express.errorHandler());
	
	app.use(everyauth.middleware());
	
	app.set('views',  __dirname + '/../views');
	app.set('view engine', 'jade');
	
	app.use(app.router);
});

everyauth.helpExpress(app);

global.app = app;

global.sessionStore = sessionStore;

require('./dynamicHelpers.js');
