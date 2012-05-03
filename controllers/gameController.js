

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
