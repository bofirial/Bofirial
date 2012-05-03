
require('./init/colorsInit.js');
require('./DAL/DAL.js');
require('./configs/types.js');

require('./init/expressInit.js')

require('./init/nowInit.js');

//Requires all controllers
var fs = require('fs')
	, controllers = fs.readdirSync('./controllers');
	
for (var i = 0; i < controllers.length; i++)
{
	require('./controllers/' + controllers[i]);
}

app.listen(80);
