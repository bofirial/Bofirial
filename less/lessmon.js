var fs = require('fs'),
	less = require('less');
	
//Reads the current directory
fs.readdir('./', function(err, files) {
	var i;
	
	console.log("Watched Files:");
	
	for (i in files)
	{
		//Compiles and Creates a Watch for each Less File
		if (files[i].match(/.*\.less/))
		{
			console.log("\t" + files[i]);
			
			compileLess(files[i]);
			
			fs.watchFile(files[i], function(curr, prev) {
				compileLess(files[i]);
			});
		}
	}
	console.log("");
});

//Function to compile a less file and output it to the stylesheets folder
function compileLess(fileName)
{
	fs.readFile(fileName, "utf-8", function(err, data) {
	
		var cssFileName = fileName.substr(0, fileName.lastIndexOf('.')) || inputcssFile,
			cssFilePath = "../public/stylesheets/" + cssFileName + '.css';
		
		less.render(data, function(err, cssData) {
		
			fs.writeFile(cssFilePath, cssData, function(err)
			{
				console.log(new Date().toLocaleTimeString() + " Compiled: " + cssFilePath);
			});
		});
	});
}
