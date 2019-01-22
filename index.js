const express = require("express")
const bodyparser = require("body-parser")
const routes = require("./api")

//initialise the express app
const app = express();

//use body parser to parse the requests
app.use(bodyparser.json());

// initialise routes
app.use(routes);

//listen on port 8000
app.listen(process.env.port || 8000, function() {

  console.log('listening on port 8000');
});
