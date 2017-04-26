var express = require('express');

module.exports = function(args){
    var agentController = args.agentController;
    var router = express.Router();

    var MODULE_NAME = 'route/deploymentRoutes';

    // a middleware function with no mount path. This code is executed for every request to the router
    router.use(function (req, res, next) {
        console.log(MODULE_NAME, req.method, req.originalUrl, Date.now());
        next();
    });

    // execute callback logErrors when an error occur
    router.use(logErrors);

    // create a new deployment
    router.post('/', function(req, res) {
        console.log(req.body.deployment_id);
        if (req.body.topology && req.body.deployment_id) {
            console.log("Loading new deployment with id: ", req.body.deployment_id);
                agentController.createDeployment({
                topology: req.body.topology,
                deployment_id: req.body.deployment_id
            },function(){
                res.status(201).json({'result': 'Deployment successiful loaded.'});
            },function(error){
                res.status(201).json({'error': error});
            });
        }


    });



    // get all info about a deployment
    router.get('/:id', function(req, res) {
        var status_deployment = agentController.getDeploymentInfo({
            deployment_id: req.params.id
        });
        if(status_deployment !== undefined)
            res.status(201).json(status_deployment);
        else
            res.status(404).json({'error': 'No info about deployment.'});
    });

    // get all info about a deployment
    router.get('/:id/status', function(req, res) {
        var status_deployment = agentController.getDeploymentStatus({
            deployment_id: req.params.id
        });
        if(status_deployment !== undefined)
            res.status(201).json(status_deployment);
        else
            res.status(404).json({'error': 'No info about deployment.'});
    });

    //stop a specific deployment
    router.post('/:id/stop', function(req, res) {

        agentController.stopDeployment({
            deployment_id: req.params.id
        }, function(msg){
            res.status(201).json({'result': 'Deployment stopped.'});
        },
        function(error) {
            res.status(500).json({'error': error});
        });

    });

    //Get web console information for a node
    router.get('/:id/node/:nodeId/console', function(req, res) {
        agentController.getNodeConsole({
            deployment_id: req.params.id,
            node_id: req.params.nodeId
        }, function(result){
            res.status(201).json(result);
        },
        function(error) {
            res.status(500).json({'error': error});
        });
    });

    function logErrors (err, req, res, next) {
      console.error(MODULE_NAME, err.stack);
      next(err);
    }
    return router;
};
