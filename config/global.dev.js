const config = require('./global');
const backend = require('./backend');

module.exports = {
  ...config,
  port: backend.dev.port,
  
  backend: {
    ...backend.dev.url,
  },
};
