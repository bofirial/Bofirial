var colorThemes = require('./init/colorsInit.js').init(),
	database = require('./init/dbInit.js').init(),
	expressInit = require('./init/expressInit.js'),
	app = expressInit.init(database),
	io = require('./init/socketioInit.js').init(app, expressInit.sessionStore);

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

io.sockets.on('connection', function (socket) {
	var session = socket.handshake.session;

	socket.emit("init");

	socket.on('Join General Chat', function(data) {
		if (session.auth) {
			socket.broadcast.to("General Chat").emit("New User", {name: session.user.firstName});
		}
		
		socket.join("General Chat");
	});
	
	socket.on("General Chat Message", function(data) {
	
		socket.broadcast.to("General Chat").emit("Message", {
			name: session.user.firstName,
			message: data.message
		});
	});
	
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.listen(80);
