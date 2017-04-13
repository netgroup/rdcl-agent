var config = {};

config.name = "RDCL AGENT";

config.mininet = {};
config.mininet.mininet_extension_path = "/home/user/workspace/Dreamer-Mininet-Extensions";

config.redis = {};
config.redis.host = 'hostname';
config.redis.port = 6379;

config.shellinabox = {};
config.shellinabox.port = 8089;

config.web = {};
config.web.port = process.env.PORT || 3030;

module.exports = config;
