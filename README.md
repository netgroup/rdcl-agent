# RDCL 3D Agents

A set of agents that can be used in the RDCL 3D framework to deploy projects on execution platforms.

## OSHI RDCL 3D Agent

This agent is used in the RDCL 3D framework to deploy [OSHI (Open Source Hybrid IP/SDN)](http://netgroup.uniroma2.it/OSHI/) topologies over a Mininet emulator.

## SRv6 RDCL 3D Agent

This agent is used in the RDCL 3D framework to deploy [ROSE (Research on Open SRv6 Ecosystem)](https://netgroup.github.io/rose/) topologies over a Mininet emulator.

## Instructions

Dependencies: 
- npm
- node.js
- shellinabox (optional)

After cloning the git repository, you have to:

install node.js dependencies

	npm install

update configuration parameters in config/config.js, for example:

	/* VM user and group */
	config.os_user = 'user';
	config.os_user_group = 'user';

	/* Mininet configurations*/
	config.mininet = {};
	config.mininet.mininet_extension_path = "/home/user/workspace/Dreamer-Mininet-Extensions";
	config.mininet.srv6_mininet_extension_path = "/home/user/workspace/srv6-mininet-extensions";
	config.mininet.SHELLINABOX_SCRIPT = path.join(process.env.PWD, 'scripts/shellinabox/mininet/mininet_ssh_connect.sh');
	config.mininet.start_cmd = ['-t',
		'-s',
		'/:'+shellinabox.user_group+':HOME:' + config.mininet.SHELLINABOX_SCRIPT +' ${url}',
		'-p', shellinabox.port,
		'-b'];

	/* Web server configurations*/
	config.web = {};
	config.web.port = process.env.PORT || 3030;

**user** needs to be a passwordless sudo user

	sudo visudo
	user ALL=(ALL) NOPASSWD:ALL

run node.js web server

	nmp start
