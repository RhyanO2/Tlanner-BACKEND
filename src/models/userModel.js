const pool = require("../config/database");

module.exports = {
  QueryUserById: async (userId) => {
    const [rows] = await pool.query(
      "SELECT id,name,email FROM User WHERE id=?",
      [userId]
    );

    return rows;
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
