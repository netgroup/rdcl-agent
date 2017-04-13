var express = require('express');
var router = express.Router();

var AgentController = require('../controllers/agent');

var controller = new AgentController();

var MODULE_NAME = 'route/agentRoutes';

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
    console.log(MODULE_NAME, req.method, req.originalUrl, Date.now());
    next();
});

// execute callback logErrors when an error occur
router.use(logErrors);

// create a new deployment
router.post('/deployments', function(req, res) {
    console.log(req.body.deployment_id);
    if (req.body.topology && req.body.deployment_id) {
        console.log("Loading new deployment with id: ", req.body.deployment_id);
            controller.createDeployment({
            topology: req.body.topology,
            deployment_id: req.body.deployment_id
        });
    }

	res.status(201).json({});
});

// get all info about a deployment
router.get('/deployments/:id', function(req, res) {
    var status_agent = controller.getStatus({
        deployment_id: req.params.id
    });
    if(status_agent !== undefined)
        res.status(201).json(status_agent);
    else
        res.status(404).json({});
});

//stop a specific deployment
router.post('/deployments/:id/stop', function(req, res) {

    controller.stopDeployment({

    }, function(msg){

    },
    function(error) {

    });

});

router.get('/deployments/:id/node/:nodeId/console', function(req, res) {

        res.status(201).json(status_agent);
    
});

// get info about agent, current deployment and shellinabox
router.get('/status', function(req, res) {
    var status_agent = controller.getStatus();
    if(status_agent !== undefined)
        res.status(201).json(status_agent);
    else
        res.status(404).json({});

});

function logErrors (err, req, res, next) {
  console.error(MODULE_NAME, err.stack);
  next(err);
}

module.exports = router;
