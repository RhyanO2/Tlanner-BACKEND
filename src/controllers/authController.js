const userAuth = require("../models/authModel");

module.exports = {
  Register: async (req, res) => {
    try {
      const userData = req.body;
      await userAuth.RegisterUser(userData);
      res.status(201).send("Usuário Registrado");
    } catch (err) {
      console.log(err);
      res.status(500).send("Erro ao registrar usuário!");
    }
  },

  Login: async (req, res) => {
    try {
      const userData = req.body;
      const results = await userAuth.LoginUser(userData);
      res.status(200).send(results);
    } catch (err) {
      const userData = req.body;
      const results = await userAuth.LoginUser(userData);
      console.log(results);
      res.status(500).send(results);
    }
  },
};
