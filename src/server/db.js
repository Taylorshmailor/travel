// src/server/db.js

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'tpham',
  password: '5346',
  database: 'travel_db'
});

const promisePool = pool.promise();

module.exports = promisePool;
