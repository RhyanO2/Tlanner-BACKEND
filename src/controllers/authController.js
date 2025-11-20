const userAuth = require('../models/userModel');
const jwtService = require('../services/jwtService');
const bcrypt = require('bcrypt');

module.exports = {
  Register: async (req, res) => {
    try {
      const authData = req.body;
    
      const result = await userAuth.createUser(authData);
      res.status(201).send(
        {
          createdUser: result,
          message: 'Usuario criado'
        }
      );
    } catch (err) {
      res.status(500).send('Erro ao registrar usuário!');
      throw err
    }
  },

  Login: async (req, res) => {
    try {
      const authData = req.body;
      const {password}= req.body
      const [rows] = await userAuth.getUserByEmail(authData);

      if(rows.length === 0)
        return res.status(401).send({
          erro: 'Usuário não encontrado',
        });
        const user = rows[0];
        const valid = bcrypt.compare(password,user.password);
        if(!valid) return res.status(401).send({
          erro:'Wrong Password!'
        });

        const token = jwtService.generateToken({ id: user.id });
      // if(!user){

      // const token = jwtService.generateToken({ id: user.id });
        delete user.password;
      res.status(200).json({user, token});
    } catch (err) {
      res.status(500).send(err);
      throw err;
    }
  },
};
