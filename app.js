var express = require('express'),
  app = express();
var bodyParser = require('body-parser');
var config = require('./config/config'),
  port = config.web.port;
var agent_routes = require('./api/routes/agentRoutes');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(agent_routes);

app.listen(port);

console.log( config.name + ' server started on: ' + port);
