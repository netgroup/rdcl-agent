if (typeof dreamer === 'undefined') {
    var dreamer = {};
}

dreamer.ShellInABox = (function (global) {
    'use strict';
    var DEBUG_LOG = "[ShellInABox]";
    var _ = require('underscore');

    function ShellInABox() {
        console.log(DEBUG_LOG, "Constructor");
        this.isInstalled();
    }


    ShellInABox.prototype.start = function (data, success, error) {

        var sib_arguments = ['-t', '-s', '/:user:user:HOME:/home/user/mininet_ssh_connect.sh ${url}',  '-p', '8081', '-b']
        this.stop(data, function(){
            var execFile = require('child_process').execFile;
            var child = execFile("shellinaboxd",sib_arguments, {
                //'cwd': config.mininet.mininet_extension_path
            }, function(error, stdout, stderr){
                if (error) {
                    throw error;
                }
                console.log(stdout);
            });
        },
        function(){

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
                    if(err)
                        console.log(DEBUG_LOG,"kill del processo", parseInt(pid), "fallito");
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
        }, function (err, resultList) {
            if (err) {
                error && error(err);
            }

            if (resultList !== undefined && resultList.length > 0) {
                console.log(DEBUG_LOG, "Is running.");
                console.log(DEBUG_LOG, "Pid list:", pid_list.toString());
                success && success(resultList);
            } else {
                console.log(DEBUG_LOG, "Is not running.");
                success && success(resultList);
            }

        });
    };



    return ShellInABox;

}(this));

if (typeof module === 'object') {
    module.exports = dreamer.ShellInABox;
}
