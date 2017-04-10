var express = require('express'),
router = express.Router();

var MODULE_NAME = 'route/agentRoutes';

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
    console.log(MODULE_NAME, req.method, req.originalUrl, Date.now());
    next();
});

// execute callback logErrors when an error occur
router.use(logErrors);


// get all info about a deployment
router.get('/deployments/:id', function(req, res) {
	var DeploymentController = require('../controllers/deployment');

	var dtrl = new DeploymentController();
	res.status(201).json({});
});

// get all info about a deployment
router.delete('/deployments/:id', function(req, res) {

});

//action on a specific deployment
router.post('/deployments/:id/:action', function(req, res) {

});

// get info about agent
router.get('/status', function(req, res) {


});

function logErrors (err, req, res, next) {
  console.error(MODULE_NAME, err.stack);
  next(err);
}

module.exports = router;
