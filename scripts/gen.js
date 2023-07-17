const { exec } = require('./utils');
const portGet = require('./PortGet');
const fs = require('fs');

const configFile = `${__dirname}/config.json`;

const mainDomain = 'cotech.site';
const hostUrl = 'http://127.0.0.1';

const sslOptions = {
  keyPath: '/etc/letsencrypt/live/cotech.site/privkey.pem',
  certPath: '/etc/letsencrypt/live/cotech.site/fullchain.pem',
};

async function createReverseProxy(subdomain, targetUrl, portNum, sslOptions) {
  try {
    // Read the existing configuration from the JSON file
    let config = JSON.parse(fs.readFileSync(configFile, 'utf8'));

    // Generate a unique ID based on the portNum
    const uniqueId = `${portNum}`;

    // Create a new reverse proxy configuration object with the ID
    const proxyConfig = {
      id: uniqueId,
      subdomain,
      targetUrl,
    };

    // Add the new proxy configuration to the configuration array
    config.proxies.push(proxyConfig);

    // Write the updated configuration back to the JSON file
    fs.writeFileSync(configFile, JSON.stringify(config, null, 2));

    console.log(`Reverse proxy configuration added to config.json with ID: ${uniqueId}`);
  } catch (error) {
    console.error('Error creating reverse proxy:', error);
  }
}

(async function () {
  try {
    const startPort = 8092;
    const endPort = 9998;

    const portGetArray = Array.from({ length: endPort - startPort + 1 }, (_, i) => startPort + i);

    const portNum = await portGet(portGetArray);

    const CMD = `pm2 -s -f --watch=yes start --name=${portNum} --namespace=${portNum} "pb/pb serve --dir=pbids/${portNum}/pb_data --http=127.0.0.1:${portNum}" && pm2 -s save`;

    await exec(CMD);

    console.log(portNum); // Use the portNum as needed

    const targetUrl = `${hostUrl}:${portNum}`;
    const subdomain = `sub1.${mainDomain}`; // Use the desired subdomain value
    await createReverseProxy(subdomain, targetUrl, portNum, sslOptions);
  } catch (error) {
    console.error(error);
    process.exit(error && error.code || 1);
  }
})();
