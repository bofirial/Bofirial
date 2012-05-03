    
var socketIOOptions = {},

    //Session Handling for Express
    parseCookie = require('connect').utils.parseCookie;

//Turns off Handshake Logging
socketIOOptions['log level'] = 1;

socketIOOptions['authorization'] = function(data, accept) {
    // check if there's a cookie header
    if (data.headers.cookie) {
        // if there is, parse the cookie
        data.cookie = parseCookie(data.headers.cookie);
        data.sessionID = data.cookie['express.sid'];

        sessionStore.get(data.sessionID, function(err, session) {

            if (err || !session) {
                // if we cannot grab a session, turn down the connection
                accept('Error', false);
            }
            else {
                // save the session data and accept the connection
                data.session = session;
                accept(null, true);
            }
        });
    }
    else {
        return accept('No cookie transmitted.', false);
    }
};

var nowjs = require('now');

//	nowjs.on("connect", function() {
//		if (this.socket.handshake.session.auth)
//			this.now.name = this.socket.handshake.session.user.fullName;
//	
//	});

global.everyone = nowjs.initialize(app, {socketio: socketIOOptions});
