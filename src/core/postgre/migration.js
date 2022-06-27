const { pool } = require('.');

const ctUsers = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users ( 
      id_user SERIAL PRIMARY KEY, 
      email VARCHAR UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role VARCHAR NOT NULL,
      status VARCHAR NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    )`;
  const data = await pool.query(query);
  return data.rows;
};

const createTable = async () => {
  try {
    await ctUsers();
    return 'create table success';
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  createTable,
};
