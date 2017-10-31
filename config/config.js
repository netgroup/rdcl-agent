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
shellinabox.user_group = config.os_user + ':' + config.os_user_group;

/* Mininet configurations*/
config.mininet = {};
config.mininet.mininet_extension_path = "/home/user/workspace/Dreamer-Mininet-Extensions";
config.mininet.SHELLINABOX_SCRIPT = path.join(process.env.PWD, 'scripts/shellinabox/mininet/mininet_ssh_connect.sh');
config.mininet.start_cmd = ['-t', 
	'-s', 
	'/:'+shellinabox.user_group+':HOME:' + config.mininet.SHELLINABOX_SCRIPT +' ${url}', 
	'-p', shellinabox.port, 
	'-b'];


/* Openvim configurations */
config.openvim = {};
// flavor for ClickOS VMs
config.openvim.CLICKFLAVORUUID = "5a258552-0a51-11e7-a086-0cc47a7794be";
// flavor for "normal" VMs
config.openvim.VMFLAVOURUUID="40f7908a-3bb0-11e7-ad8f-0cc47a7794be";

config.openvim.CLICKINJECTOR_HOME = "/home/rfb/configinjector";
config.openvim.CLICKINJECTOR = path.join(config.openvim.CLICKINJECTOR_HOME, 'configinjector');
config.openvim.STAMINALCLICKOSIMAGE = path.join(config.openvim.CLICKINJECTOR_HOME,'clickos_x86_64_staminal');
config.openvim.BASE_CWD =  path.join(process.env.PWD,'scripts/superfluidity');
config.openvim.OPENVIM_CLI_HOME = '/home/rfb/openvimclient';
config.openvim.OPENVIM = path.join(config.openvim.OPENVIM_CLI_HOME, 'openvim');
config.openvim.OPENVIMHOST = '127.0.0.1';
config.openvim.OPENVIMHOSTPORT = "2222";
config.openvim.OPENVIMHOSTUSERNAME="root";
config.openvim.env = {};
config.openvim.env.OPENVIM_HOST = 'localhost';
config.openvim.env.OPENVIM_PORT = 9080;
config.openvim.env.OPENVIM_ADMIN_PORT = 9085;
config.openvim.env.OPENVIM_TENANT = '96035cba-b313-11e6-866f-0cc47a7794be';
config.openvim.CLEAN_UP_SCRIPT = 'cleanup.sh';
config.openvim.SHELLINABOX_SCRIPT = path.join(process.env.PWD, 'scripts/shellinabox/superfluidity/remotevirshconsole.sh');
config.openvim.start_cmd = ['-t', 
	'-s', 
	'/:'+shellinabox.user_group+':HOME:' + config.openvim.SHELLINABOX_SCRIPT +' ${url}', 
	'-p', shellinabox.port, 
	'-b'];
/* CRAN configurations*/
config.cran = {};
config.cran.BASE_CWD = path.join(process.env.PWD,'scripts/cran');
config.cran.SHELLINABOX_SCRIPT = '';

config.web = {};
config.web.port = process.env.PORT || 3030;

module.exports = config;
