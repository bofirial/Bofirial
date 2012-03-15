var socket = io.connect('http://localhost');

$.fn.toggleOpenClass = function() {

	$(this).toggleClass('open', 1000);
}

$(document).ready(function() {
	$('.headerWrapper + .expandBar').click(function(e) {
		$('.headerWrapper').toggleOpenClass();
	});
	
	$('.openGames a').click(function (e) {
		$(this).closest('li').toggleOpenClass();
	});
});


function markupUserName(name) {
	var cls = "name";
	
	if (name == $('.header').data('username'))
	{
		cls = "self";
	}
	
	return "<span class='" + cls + "'>" + name + "</span>";
}

function sendMessage() {
	var $input = $('.chatBox input'),
		message = $input.val();

	if (message == "")
	{
		return;
	}

	$input.val("");
	
	socket.emit("General Chat Message", {message: message});
	
	insertMessage({name: $('.header').data('username'), message: message});
}

function insertMessage(data) {
	var chatLog = $('.chatLog');

	chatLog.append("<li class='message'>" + markupUserName(data.name) + ": " + data.message + "</li>");
	
	chatLog.stop(true).animate({scrollTop: chatLog[0].scrollHeight}, 500);	
}

$(document).ready(function() {
	$('.chatBox input').keypress(function(e) {
		if (e.which == 13) {
			sendMessage();
		}
	});
});

socket.on('init', function(data) {
	var $chatLog = $('.chatLog');

	if ($('.chatBox').data('enabled') == true)
	{
		socket.emit('Join General Chat');
	}
	
	socket.on('New User', function (data) {
		$chatLog.append("<li class='newUser'>" + markupUserName(data.name) + " has connected.</li>");
	});
	
	socket.on('Message', function (data) {
		insertMessage(data);
	});
});
