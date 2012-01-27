var express = require('express'),
	app = express.createServer(),
	schemas = null;
	
var everyauth = require('everyauth');

module.exports.init = function(database) {
	
	schemas = require('./schemas.js')(database);
	
	everyauth.google
		.appId('1089135435768.apps.googleusercontent.com')
		.appSecret('SPh1akml61UxCKtwEkCywTNR')
		.scope('https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email')
		.handleAuthCallbackError( function(req, res) {
			console.log('handleAuthCallbackError');
		})
		.findOrCreateUser( function(session, accessToken, accessTokenExtra, googleUserMetadata) {
			var promise = this.Promise(),
				user = new schemas.User();
			
			schemas.User.find({id: googleUserMetadata.id}, function (err, docs) {
				if (docs.length > 0)
				{
					user = docs[0];
					console.log('User: ' + user.fullName + ' logged in!'.info);
				} else {
					user.firstName = googleUserMetadata.given_name;
					user.lastName = googleUserMetadata.family_name;
					user.fullName = googleUserMetadata.name;
					user.email = googleUserMetadata.email;
					user.verifiedEmail = googleUserMetadata.verified_email;
					user.id = googleUserMetadata.id;
					
					user.save(function (err) {
						console.log('New User: ' + user.fullName + ' saved!'.info);
					});
				}
				
				promise.fulfill(user);
			})
			
			return promise;
			
		})
		.redirectPath('/');
	
	app.configure(function() {
		app.use(express.static(__dirname + '/../public'));
		app.use(express.bodyParser());
		app.use(express.cookieParser());
		app.use(express.session({secret: "abcdefgh"}));
		app.use(express.errorHandler());
		
		app.use(everyauth.middleware());
		
		app.set('views',  __dirname + '/../views');
		app.set('view engine', 'jade');
		
		app.use(app.router);
	});
	
	everyauth.helpExpress(app);
	
	return app;
};
