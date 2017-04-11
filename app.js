var express = require('express'),
  config = require('./config/config'),
  app = express(),
  bodyParser = require('body-parser'),
  port = config.web.port;

  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var agent_routes = require('./api/routes/agentRoutes');
app.use(agent_routes);


app.listen(port);

console.log( config.name + ' server started on: ' + port);
