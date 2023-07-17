(async function() {
    try {
      const { exec } = require("../scripts/utils");
      const CMD = `pm2 -s -f --watch=yes start --name=mgt --namespace=mgt "pb/pb serve --dir=pb/mgt/pb_data --http=127.0.0.1:8090" && pm2 -s save`;
     
      await exec(CMD);

     
    } catch (error) {
      console.error(error);
      process.exit(error && error.code || 1);
    }


  })();




