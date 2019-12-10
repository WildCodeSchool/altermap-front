const { Pool } = require('pg');

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'altermap',
  password: 'password',
  port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});
