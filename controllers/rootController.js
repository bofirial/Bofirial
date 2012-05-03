

app.get('/', function(req, res) {
	res.render('root', {locals: {
		currentNav: "Home"
	}});
});
