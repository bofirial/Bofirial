

//everyone.now.logStuff = function(msg){
//		if (this.socket.handshake.session.auth)
//    		console.log(this.socket.handshake.session.user.fullName, msg);
//};

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

