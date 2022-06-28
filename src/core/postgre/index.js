const pg = require('pg');

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL || 'postgresql://eki:password@localhost:5432/my_database',
//   // connectionString: 'postgresql://eki:password@localhost:5432/my_database',
//   // connectionString: 'postgresql://localhost/my_database?user=eki&password=password',
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
const pool = new pg.Client({
  user: 'eki',
  password: 'password',
  database: 'my_database',
  port: 5432,
  ssl: false,
});

pool.connect();

module.exports = {
  pool,
};
