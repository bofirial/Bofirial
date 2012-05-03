
	
//Globals for all Views
app.dynamicHelpers({
	//Function to convert an input Name to a jQuery compatible Id
	convertNameToId: function(req, res) {
		return function(name) {
            
			var charConversions = {},
				id = name;
			
			charConversions['['] = '_';
			charConversions[']'] = '';
			charConversions[':'] = '';
			charConversions['.'] = '_';
			
			for (var char in charConversions)
			{
				id = id.replace(char, charConversions[char]);
			}
		
			return id;
		};
	}
});
