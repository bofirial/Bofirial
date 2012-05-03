/* 
*  Types.js is used both Server Side and Client Side
*/

var types = {
	
	//Every Auth Types
	everyAuthTypes: {
		google: 1
	},
	
	//Game Types
	gameTypes: {
		
		ticTacToe: {value: 1, name: "Tic Tac Toe"}
	//, euchre: {value: 2, name: "Euchre"}
	}

};

if (typeof global != undefined)
{
	global.types = types;
}

