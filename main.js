var colorThemes = require('./init/colorsInit.js').init(),
	dal = require('./DAL/DAL.js'),
	expressInit = require('./init/expressInit.js'),
	app = expressInit.init(dal),
	everyone = require('./init/nowInit.js').init(app, expressInit.sessionStore),
	types = require('./configs/types.js');
	
//Globals for all Views
app.dynamicHelpers({
	//Types
	types: function(req, res) {
		return types;
	},
	//Function to convert an input Name to a jQuery compatible Id
	convertNameToId: function(req, res) {
		return function(name) {
            
			var charConversions = {},
				id = name;
			
			charConversions['['] = '_';
			charConversions[']'] = '';
			charConversions[':'] = '';
			charConversions['.'] = '_';
			
			for (var char in charConversions)
			{
				id = id.replace(char, charConversions[char]);
			}
		
			return id;
		};
	}
});

app.get('/', function(req, res) {
	res.render('root', {locals: {
		currentNav: "Home"
	}});
});

app.get('/newgame', function(req, res) {

	res.render('newgame', {locals: {
		currentNav: "NewGame"
	}});
});

app.post('/newgame', function(req, res) {

	res.render('newgame', {locals: {
		currentNav: "NewGame"
	}});
});

everyone.now.logStuff = function(msg){
    console.log(msg);
};

//io.sockets.on('connection', function (socket) {
//	var session = socket.handshake.session;
//
//	socket.emit("init");
//
//	socket.on('Join General Chat', function(data) {
//		if (session.auth) {
//			socket.broadcast.to("General Chat").emit("New User", {name: session.user.firstName});
//		}
//		
//		socket.join("General Chat");
//	});
//	
//	socket.on("General Chat Message", function(data) {
//	
//		socket.broadcast.to("General Chat").emit("Message", {
//			name: session.user.firstName,
//			message: data.message
//		});
//	});
//	
//  socket.on('my other event', function (data) {
//    console.log(data);
//  });
//});

app.listen(80);
