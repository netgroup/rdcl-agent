if (typeof dreamer === 'undefined') {
    var dreamer = {};
}

dreamer.ShellInABox = (function (global) {
    'use strict';
    var DEBUG_LOG = "[ShellInABox]";
    var _ = require('underscore');
    var config = require('../config/config');

    function ShellInABox() {
        console.log(DEBUG_LOG, "Constructor");
        
    }


    ShellInABox.prototype.start = function (data, success, error) {
        console.log(DEBUG_LOG, "Start process...");
        var sib_arguments = config.shellinabox.start_cmd;
        this.stop(data, function () {
                console.log(DEBUG_LOG, "Starting process...");

                var spawn = require('child_process').spawn;
                var sh = spawn('shellinaboxd', sib_arguments, {
                    stdio: 'ignore', // piping all stdio to /dev/null
                    detached: true
                }).unref();
                success && success();

            },
            function () {

            })

    };

    ShellInABox.prototype.stop = function (data, success, error) {
        console.log(DEBUG_LOG, "kill process...");
        this.isRunning(function (resultList) {
            //list of pid
            var pid_list = _.pluck(resultList, 'pid');
            var ps = require('ps-node');
            pid_list.forEach(function (pid) {
                ps.kill(pid, {
                    signal: 'SIGKILL'
                }, function (err) {
                    if (err)
                        console.log(DEBUG_LOG, "kill del processo", parseInt(pid), "fallito");
                    else
                        console.log(DEBUG_LOG, "kill del processo", parseInt(pid), "completato.");
                });
            });
            success && success();
        }, function (e) {

            error && error(e);
        });
        //console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments );

    };

    ShellInABox.prototype.isInstalled = function (success, error) {
        console.log(DEBUG_LOG, "Check if is installed...");
        var commandExistsSync = require('command-exists').sync;
        if (commandExistsSync('shellinaboxd')) {
            console.log(DEBUG_LOG, "command exists");
            success && success("shellinaboxd installed.");
        } else {
            console.log(DEBUG_LOG, "command not exists");
            error && error("shellinaboxd not installed.!");
        }

    };

    ShellInABox.prototype.isRunning = function (success, error) {
        console.log(DEBUG_LOG, "check if is running...");
        var ps = require('ps-node');
        ps.lookup({
            command: 'shellinaboxd',
            psargs: 'ax'
        }, function (err, resultList) {
            if (err) {
                error && error(err);
            }
            console.log(resultList);
            if (resultList != undefined && resultList.length > 0) {
                console.log(DEBUG_LOG, "Is running.");
                success && success(resultList);
            } else {
                console.log(DEBUG_LOG, "Is not running.");
                success && success(resultList);
            }

        });
    };

    ShellInABox.prototype.getNodeEndPoint = function(args){
        console.log(JSON.stringify(args));
        var node_endpoint = 'http://'+ args['hostname'] +':'+config.shellinabox.port+'/?nodeId='+args['node_id']
        return node_endpoint;
    }



    return ShellInABox;

}(this));

if (typeof module === 'object') {
    module.exports = dreamer.ShellInABox;
}
