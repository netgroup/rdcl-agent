var express = require('express');
var router = express.Router();
var Log = require('log');
var log = new Log('info');

var AgentController = require('../controllers/superfluidity/openvim/agent');

var controller = new AgentController();
var Deployment_routes = require('./deploymentRoutes');
var deployment_routes = new Deployment_routes({agentController: controller, log: log});

var MODULE_NAME = 'route/agentRoutes';

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
    log.info("[%s] %s %s",MODULE_NAME, req.method, req.originalUrl);
    next();
});

// execute callback logErrors when an error occur
router.use(logErrors);

// get info about agent, current deployment and shellinabox
router.get('/status', function(req, res) {
    var status_agent = controller.getStatus();
    if(status_agent !== undefined)
        res.status(201).json(status_agent);
    else
        res.status(404).json({});

});

// all requests for deployments
router.use('/deployments', deployment_routes);

function logErrors (err, req, res, next) {
  console.error(MODULE_NAME, err.stack);
  next(err);
}

module.exports = router;
