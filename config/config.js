var config = {};
var path = require("path");
config.name = "RDCL AGENT";


config.os_user = 'user';
config.os_user_group = 'user';

config.redis = {};
config.redis.host = 'hostname';
config.redis.port = 6379;

/* ShellInABox configurations */
config.shellinabox = {};
var shellinabox  = config.shellinabox;
shellinabox.port = 8089;
shellinabox.script_path = '/home/rfb/ovim-agent/scripts/shellinabox/superfluidity/remotevirshconsole.sh';
shellinabox.user_group = config.os_user + ':' + config.os_user_group;
shellinabox.start_cmd = ['-t', '-s', '/:'+shellinabox.user_group+':HOME:' + shellinabox.script_path +' ${url}', '-p', shellinabox.port, '-b'];

/* Mininet configurations*/
config.mininet = {};
config.mininet.mininet_extension_path = "/home/user/workspace/Dreamer-Mininet-Extensions";

/* Openvim configurations */
config.openvim = {};
config.openvim.BASE_CWD =  path.join(process.env.PWD,'scripts/superfluidity');
config.openvim.OPENVIM_CLI_HOME = '/home/rfb/openvimclient';
config.openvim.OPENVIM_HOST = 'localhost';
config.openvim.OPENVIM_PORT = 9080;
config.openvim.OPENVIM_ADMIN_PORT = 9085;
config.openvim.OPENVIM_TENANT = '96035cba-b313-11e6-866f-0cc47a7794be';
config.openvim.CLEAN_UP_SCRIPT = 'cleanup.sh';
config.openvim.SHELLINABOX_SCRIPT = path.join(process.env.PWD, 'scripts/shellinabox/superfluidity/remotevirshconsole.sh');

/* CRAN configurations*/
config.cran = {};
config.cran.BASE_CWD = path.join(process.env.PWD,'scripts/cran');
config.cran.SHELLINABOX_SCRIPT = '';

config.web = {};
config.web.port = process.env.PORT || 3030;

module.exports = config;
