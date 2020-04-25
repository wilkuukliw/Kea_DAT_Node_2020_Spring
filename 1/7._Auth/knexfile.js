const credentials = require("./config/mysqlCredentials").credentials;

module.exports = {
  development: {
    client: 'mysql',
    connection: credentials
  }
};