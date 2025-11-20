const user = require('../models/userModel');

module.exports = {
  GetUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const results = await user.GetUserById(userId);
      res.status(200).send(results);
    } catch (err) {
      res.status(500).send('Erro ao editar a task, tente novamente!');
      console.log(err);
    }
  },
  PutUser: async (req, res) => {
    try {
      const userData = req.body;
      const userId = req.params.id;
      const results = await user.EditUser(userData, userId);
      res.status(200).send(results);
    } catch (err) {
      res.status(500).send('Erro ao editar a task, tente novamente!');
      console.log(err);
    }
  },
  DelUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const results = await user.DeleteUser(userId);
      res.status(200).send(results);
    } catch (err) {
      res.status(500).send('Erro ao editar a task, tente novamente!');
    }
  },
};
