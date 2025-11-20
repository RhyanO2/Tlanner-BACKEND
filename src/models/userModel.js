const pool = require("../config/database");

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
  EditUser: async (userData, userId) => {
    const { name, email } = userData;

    await pool.query("UPDATE User SET name=?, email=? WHERE id=?", [
      name,email,
      userId,
    ]);

    return "Usuário Editado!";
  },
  DeleteUser: async (userId) => {
    await pool.query("DELETE FROM User WHERE id=?", [userId]);

    return 'Usuário Excluido!'
  },
};
