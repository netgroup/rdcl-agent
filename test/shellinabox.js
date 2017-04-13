var ShellInABox = require('../helpers/shellinabox');


var shellinabox = new ShellInABox();

//shellinabox.isInstalled();
//console.log("#########Check if shellinaboxd process is is running##########")
//shellinabox.isRunning();
console.log("#########Kill shellinaboxd process ##########");
shellinabox.stop();
