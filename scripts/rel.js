
(async function() {
  try {
  
    const {exec} = require('./utils');
    
    const portNum = "9192";
    const CMD = `pm2 -s -f reload ${portNum}`;
    await exec(CMD);
  } catch (error) {
    console.error(error);
    process.exit(error && error.code || 1);
  }
})();