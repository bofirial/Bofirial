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
			//Closure to store FileName for the Callback.
			(function(lessFileName){
				console.log("\t" + lessFileName);
			
				compileLess(lessFileName);
				
				fs.watchFile(lessFileName, function(curr, prev) {
					compileLess(lessFileName);
				});
			})(files[i]);
		}
	}
	console.log("");
});

//Function to compile a less file and output it to the stylesheets folder
function compileLess(fileName)
{
	fs.readFile(fileName, "utf-8", function(err, data) {
	
		var cssFileName = fileName.substr(0, fileName.lastIndexOf('.')),
			cssFilePath = "../public/stylesheets/" + cssFileName + '.css';
			
		less.render(data, function(err, cssData) {
		
			fs.writeFile(cssFilePath, cssData, function(err)
			{
				console.log(new Date().toLocaleTimeString() + " Compiled: " + cssFilePath);
			});
		});
	});
}
