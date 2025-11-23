const pool = require('../config/database');
const bcrypt = require('bcrypt');

module.exports = {
  getAllUsers: async () => {
    const user = await pool.query('SELECT (name,email) FROM User');

    return user;
  },

  getUserById: async (userId) => {
    const user = await pool.query('SELECT name, email FROM User WHERE id=?', [
      userId,
    ]);

    return user[0];
  },
  getUserByEmail: async (authData) => {
    const { email } = authData;

    const user = await pool.query('SELECT * FROM User WHERE email=?', [email]);
    return user;
  },
  createUser: async (name,email,hash) => {
    // const { name, email, hash } = authData;

    await pool.query('INSERT INTO User (name,email,password) VALUES (?,?,?)', [
      name,
      email,
      hash,
    ]);

    return 'Usuário Criado!';
  },
  EditUser: async (userData, userId) => {
    const { name, email } = userData;

    await pool.query('UPDATE User SET name=?, email=? WHERE id=?', [
      name,
      email,
      userId,
    ]);

    return 'Usuário Editado!';
  },
  DeleteUser: async (userId) => {
    await pool.query('DELETE FROM User WHERE id=?', [userId]);

    return 'Usuário Excluido!';
  },
};
