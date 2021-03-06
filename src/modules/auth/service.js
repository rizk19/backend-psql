const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  checkEmail,
  getUser,
  // getToko,
  checkStatusActive,
} = require('./repo');

const getLoggedIn = async (id) => {
  try {
    const user = await getUser(id);
    // const toko = await getToko(id);
    return {
      code: 200,
      status: 'success',
      data: { user },
    };
  } catch (err) {
    return {
      code: 500,
      status: 'error',
      message: err.message,
    };
  }
};

const checkMatchPass = async (hashedPass, dbPass) => new Promise((resolve, reject) => {
  bcrypt.compare(dbPass, hashedPass, (err, result) => {
    if (err) reject(err);
    resolve(result);
    // return result;
  });
});

const passwordIsMatch = async (email, password) => {
  let statusCode = 200;
  try {
    const user = await checkEmail(email);

    if (!user && user === undefined) {
      statusCode = 401;
      throw new Error('Akun anda belum terdaftar');
    }
    const isMatch = await checkMatchPass(user.password, password);
    const statusActive = await checkStatusActive(email);
    if (!statusActive) {
      statusCode = 401;
      throw new Error('Akun anda tidak aktif');
    }

    if (!isMatch) {
      statusCode = 401;
      throw new Error('Email atau password yang anda masukan salah.');
    }

    const payload = {
      user: {
        id: user.id_user,
        role: user.role,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '365d',
    });
    return {
      code: statusCode,
      status: 'success',
      data: {
        token: `Bearer ${token}`,
        role: user.role,
      },
      message: 'token authorization created',
    };
  } catch (err) {
    return {
      code: statusCode === 200 ? 500 : statusCode,
      status: 'error',
      message: err.message,
    };
  }
};

module.exports = {
  passwordIsMatch,
  getLoggedIn,
};
