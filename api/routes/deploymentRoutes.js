var express = require('express');

module.exports = function(args){
    var agentController = args.agentController;
    var router = express.Router();

    var MODULE_NAME = 'route/deploymentRoutes';

    // a middleware function with no mount path. This code is executed for every request to the router
    router.use(function (req, res, next) {
        log.info("[%s] %s %s",MODULE_NAME, req.method, req.originalUrl);
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
        console.log("get info deployment")
        agentController.getDeploymentInfo({
            deployment_id: req.params.id
        },function(info_deployment){
            if(info_deployment !== undefined)
                res.status(201).json(info_deployment);
            else
                res.status(404).json({'error': 'No info about deployment.'});
        },function(e){
            res.status(404).json({'error': 'No info about deployment.'});
        });
        
    });

    // get all info about a deployment
    router.get('/:id/status', function(req, res) {
        agentController.getDeploymentStatus({
            deployment_id: req.params.id
        },function(status_deployment){
            if(status_deployment !== undefined)
                res.status(201).json(status_deployment);
            else
                res.status(404).json({'error': 'No info about deployment.'});
        },function(e){
            res.status(404).json({'error': 'No info about deployment.'});
        });
        
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
        var hostname = ( req.headers.host.match(/:/g) ) ? req.headers.host.slice( 0, req.headers.host.indexOf(":") ) : req.headers.host
 
        agentController.getNodeConsole({
            deployment_id: req.params.id,
            node_id: req.params.nodeId,
            hostname: hostname
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
