var express = require('express');

module.exports = function(args){

    var router = express.Router();
    var MODULE_NAME = 'route/nodeRoutes';

    // a middleware function with no mount path. This code is executed for every request to the router
    router.use(function (req, res, next) {
        console.log(MODULE_NAME, req.method, req.originalUrl, Date.now());
        next();
    });

    return router;
};
