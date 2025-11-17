const userAuth = require('../models/authModel');
const jwtService = require('../services/jwtService');

module.exports = {
  Register: async (req, res) => {
    try {
      const authData = req.body;
      const results = await userAuth.RegisterUser(authData);
      res.status(201).send(results);

    } catch (err) {
      console.log('JSON object incorreto');
      console.log(err);
      res.status(500).send('Erro ao registrar usuário!');
    }
  },

  Login: async (req, res) => {
    try {
      const authData = req.body;
      const user = await userAuth.LoginUser(authData);
      if(user===null){
        return res.status(404).send('Usuário não encontrado');
      }
      if(user===false){
        return res.status(401).send('Senha Incorreta');
      }
      const token = jwtService.generateToken({ id: user.id });

      res.status(200).json({user, token});
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
