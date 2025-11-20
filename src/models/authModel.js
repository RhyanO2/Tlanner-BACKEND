const pool = require('../config/database');
const bcrypt = require('bcrypt');

module.exports = {
  getAllUsers: async () => {
    const user = await pool.query('SELECT (name,email) FROM User');

    return user;
  },

  getUserById: async (authData) => {
    const { email } = authData;

    const user = await pool.query('SELECT name, email FROM User WHERE id=?', [
      email,
    ]);

    return user;
  },
  getUserByEmail: async (authData) => {
    const { email } = authData;

    const user = await pool.query('SELECT * FROM User WHERE email=?', [email]);
    return user;
  },
  createUser: async (authData) => {
    const { name, email, password } = authData;

    try {
      const hash = await bcrypt.hash(password, 10);
      await pool.query(
        'INSERT INTO User (name,email,password) VALUES (?,?,?)',
        [name, email, hash],
      );
      const createdUser = await pool.query(
        'SELECT name, email FROM User  WHERE email=?',
        [email],
      );

      return createdUser[0];
    } catch (err) {
      return {
        error: `${err}`,
        message: 'Error database',
      };
    }
  },
};
