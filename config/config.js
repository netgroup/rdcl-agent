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
shellinabox.script_path = 'scripts/shellinabox/mininet_ssh_connect.sh';
shellinabox.start_cmd = ['-t', '-s', '/:user:user:HOME:' + shellinabox.script_path +' ${url}', '-p', shellinabox.port, '-b'];

config.web = {};
config.web.port = process.env.PORT || 3030;

module.exports = config;
