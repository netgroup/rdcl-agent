var config = {};

config.name = "OSHI RDCL AGENT - on MININET"
config.redis = {};
config.web = {};

config.redis.host = 'hostname';
config.redis.port = 6379;
config.web.port = process.env.PORT || 3000;

module.exports = config;
