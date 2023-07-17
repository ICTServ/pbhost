
(async function() {
  try {
    const delFunc = require("./delFunc.js");
     // Replace 'proxy-1234' with the desired ID to delete
    
    const {exec} = require('./utils.js');
    const portNum = '8092';
    delFunc(`${portNum}`);
    const CMD = `pm2  -s -f stop ${portNum} && pm2 -s -f delete ${portNum} --shutdown-with-message && pm2 -s save --force && rm -r pbids/${portNum}`;
    await exec(CMD);
  } catch (error) {
    console.error(error);
    process.exit(error && error.code || 1);
  }
})();