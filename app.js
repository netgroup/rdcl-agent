var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

var agent_routes = require('./api/routes/agentRoutes');
app.use(agent_routes);

app.listen(port);

console.log('OSHI MININET AGENT RDCL server started on: ' + port);
