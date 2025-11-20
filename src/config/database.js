const mysql = require('mysql2/promise');
const env = require('../../env')

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT_APP,
// });

const pool = mysql.createPool({
  host: process.env.DB_HOST || `${env.host}`,
  user: process.env.DB_USER || `${env.user}`,
  password: process.env.DB_PASSWORD || `${env.password}`,
  database: process.env.DB_NAME || `${env.database}`,
  // port: process.env.DB_PORT_APP || `${env.porta}`
});


module.exports = pool;
