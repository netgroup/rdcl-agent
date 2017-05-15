var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('./config/config');
var port = config.web.port;
var agent_routes = require('./api/routes/agentRoutes');
var ShellInABox = require('./helpers/shellinabox');
var shellinabox = new ShellInABox();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(agent_routes);


app.listen(port);

console.log( config.name + ' server started on: ' + port);
shellinabox.start({},function(){
	console.log("ShellInABox started.")
});