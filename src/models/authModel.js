const pool = require("../config/database");
const bcrypt = require("bcrypt");

module.exports = {
  RegisterUser: async (authData) => {
    const { name, email, password } = authData;

    const hash = await bcrypt.hash(password, 10);

    await pool.query("INSERT INTO User (name,email,password) VALUES (?,?,?)", [
      name,
      email,
      hash,
    ]);

    return "Usuário Criado!";
  },

  LoginUser: async (authData) => {
    const { email, password } = authData;

    const [rows] = await pool.query("SELECT * FROM User WHERE email=?", [
      email,
    ]);

    if (rows.length === 0) {
      return { sucess: false, message: "Usuário não encontrado" };
    }

    const user = rows[0];

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return { sucess: false, message: "Senha Incorreta!" };
    }

    delete user.password;

    return { sucess: true, user };
  },
};
