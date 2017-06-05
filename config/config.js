var config = {};

config.name = "RDCL AGENT";

config.mininet = {};
config.mininet.mininet_extension_path = "/home/user/workspace/Dreamer-Mininet-Extensions";

config.redis = {};
config.redis.host = 'hostname';
config.redis.port = 6379;

config.shellinabox = {};
var shellinabox  = config.shellinabox;
shellinabox.port = 8089;
shellinabox.script_path = '/home/user/workspace/rdcl-agent/scripts/shellinabox/mininet/mininet_ssh_connect.sh';
shellinabox.user_group = 'user:user';
shellinabox.start_cmd = ['-t', '-s', '/:'+shellinabox.user_group+':HOME:' + shellinabox.script_path +' ${url}', '-p', shellinabox.port, '-b'];


config.openvim = {};
config.openvim.BASE_CWD = '/home/rfb/vim-agent/scripts/superfluidity';
config.openvim.OPENVIM_CLI_HOME = '/home/rfb/openvimclient';
config.openvim.OPENVIM_HOST = 'localhost';
config.openvim.OPENVIM_PORT = 9080;
config.openvim.OPENVIM_ADMIN_PORT = 9085;
config.openvim.OPENVIM_TENANT = '96035cba-b313-11e6-866f-0cc47a7794be';
config.openvim.CLEAN_UP_SCRIPT = 'cleanup.sh'

config.cran = {};
config.cran.BASE_CWD = '/home/user/workspace/rdcl-agent/scripts/cran'

config.web = {};
config.web.port = process.env.PORT || 3030;

module.exports = config;
