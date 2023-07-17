
const fs = require('fs');

const configFile = `${__dirname}/config.json`;

module.exports = function delFunc(id) {
  try {
    // Read the existing configuration from the JSON file
    let config = JSON.parse(fs.readFileSync(configFile, 'utf8'));

    // Find the index of the proxy configuration with the provided ID
    const index = config.proxies.findIndex((proxy) => proxy.id === id);

    if (index !== -1) {
      // Remove the proxy configuration from the configuration array
      config.proxies.splice(index, 1);

      // Write the updated configuration back to the JSON file
      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));

      console.log(`Reverse proxy configuration with ID ${id} deleted from config.json`);
    } else {
      console.log(`Reverse proxy configuration with ID ${id} not found in config.json`);
    }
  } catch (error) {
    console.error('Error deleting reverse proxy configuration:', error);
  }
}

