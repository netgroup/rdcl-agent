var express = require('express'),
  config = require('./config/config'),
  app = express(),
  port = config.web.port;

var agent_routes = require('./api/routes/agentRoutes');
app.use(agent_routes);

app.listen(port);

console.log( config.name + ' server started on: ' + port);
