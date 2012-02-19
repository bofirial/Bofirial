var colors = require('colors'),
	theme = require('../configs/colorsTheme.js');

exports.init = function() {

	//Bold and Blue Color Sequence
	colors.addSequencer("boldBlue", function(letter, i, exploded) {
		return letter.bold.blue;
	});

	//Bold and Red Color Sequence
	colors.addSequencer("boldRed", function(letter, i, exploded) {
		return letter.bold.red;
	});
		
	colors.setTheme(theme);
}
