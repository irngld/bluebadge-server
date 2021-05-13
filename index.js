let express = require('express');	// imported from package.json "dependencies" (see below)
let app = express();  			// make our own instance to use express

app.listen(3000, function() {		// to run from CLI "npm start"
    console.log('App is listening on port 3000')
})
	