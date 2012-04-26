var express = require('express'),
	MemoryStore = express.session.MemoryStore,
	app = express.createServer(),
	sessionStore = new MemoryStore(),
	everyauth = require('everyauth');

//Initializes Express
exports.init = function(dal) {
	
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
			var promise = this.Promise(),
				user = {};
			
			//Selects the User from the Database
			dal.User.selectById(googleUserMetadata.id, function (err, docs) {
				if (docs.length > 0)
				{
					//CONSIDER: Might want to update user data if its changed.
					
					user = docs[0];
					
					console.log(('User: ' + user.fullName + ' logged in!').connection);
					
				} else {
					//Inserts the New User into the Database
				
					user.firstName = googleUserMetadata.given_name;
					user.lastName = googleUserMetadata.family_name;
					user.fullName = googleUserMetadata.name;
					user.email = googleUserMetadata.email;
					user.verifiedEmail = googleUserMetadata.verified_email;
					user.id = googleUserMetadata.id;
					
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
		  var user;
			
			//Selects the User from the Database
			dal.User.selectById(userId, function (err, docs) {
				if (docs && docs.length > 0)
				{
					user = docs[0];
				}
				
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
	
	return app;
};

exports.sessionStore = sessionStore;
