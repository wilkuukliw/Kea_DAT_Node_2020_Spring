const credentials = require("../config/mysqlCredentials");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, {
  host: credentials.host,
  dialect: credentials.dialect,
  operatorsAliases: false,
  
  define: {
    timestamps: false
},

  pool: {
    max: credentials.pool.max,
    min: credentials.pool.min,
    acquire: credentials.pool.acquire,
    idle: credentials.pool.idle,
  },
});



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.images = require("./image.model.js")(sequelize, Sequelize);

module.exports = db;