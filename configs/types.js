/* 
*  Types.js is used both Server Side and Client Side
*/

var types = {
	
	//Game Types
	gameTypes: {
		
		ticTacToe: {value: 1, name: "Tic Tac Toe"}
	}

};

if (!module)
{
	var module = {};
}

module.exports = types;
