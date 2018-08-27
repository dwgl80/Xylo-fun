const { Pool } = require('pg');

const connection = {
  user: 'duss',
  host: 'localhost',
  database: 'xylo',
  password: '',
  port: 5432,
}

const pool = new Pool(connection);


const saveSong = (params, cb) => {
  let values = [params.name, params.song];
  let query = `insert into songs (name, song) values ($1, $2) returning *`;
  pool.query(query, values)
    .then( res => {
      console.log('saved song');
      cb(res.rows);
    })
    .catch( err => console.log(err));
};

const getNames = (cb) => {
  let query = `select name from songs`;
  pool.query(query)
    .then( res => cb(res.rows))
    .catch( err => console.log(err));
}

const getSong = (params, cb) => {
  let query = `select song from songs where name = $1`
  pool.query(query, [params.name])
    .then( res => cb(res.rows))
    .catch( err => console.log(err));
}

module.exports = {
  saveSong,
  getNames,
  getSong,
}