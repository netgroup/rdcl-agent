var express = require('express');
var Log = require('log')
var log = new Log('info');

module.exports = function(args){

    var router = express.Router();
    var MODULE_NAME = 'route/nodeRoutes';

    // a middleware function with no mount path. This code is executed for every request to the router
    router.use(function (req, res, next) {
        log.info("[%s] %s %s",MODULE_NAME, req.method, req.originalUrl);
        next();
    });

    return router;
};
