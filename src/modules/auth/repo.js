const { pool } = require('../../core/postgre');

const checkEmail = async (email) => {
  const query = `
    SELECT * FROM users WHERE email=$1;  
  `;
  const value = [email];
  const data = await pool.query(query, value);
  return data.rows[0];
};

const checkStatusActive = async (email) => {
  const query = `
    SELECT * FROM users WHERE email=$1 AND status='aktif';  
  `;
  const value = [email];
  const data = await pool.query(query, value);
  return data.rows[0];
};

const getUser = async (id) => {
  const text = `
    SELECT u.id_user, u.email, u.status, u.role, ud.name, ud.hp, ud.ttl, ud.gender, ud.foto, u.created_at
      FROM users u
      LEFT JOIN users_detail ud
      ON u.id_user = ud.id_user
      WHERE u.id_user=$1
    `;
  const value = [id];
  const data = await pool.query(text, value);
  return data.rows[0];
};

const getToko = async (id) => {
  const text = 'SELECT * FROM umkm WHERE id_user=$1';
  const value = [id];
  const data = await pool.query(text, value);
  return data.rows[0];
};

module.exports = {
  checkEmail,
  checkStatusActive,
  getUser,
  getToko,
};
