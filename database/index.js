const { Pool } = require('pg');

const connection = {
  user: 'duss',
  host: 'localhost',
  database: 'xylo',
  password: '',
  port: 5432,
}

const pool = new Pool(connection);