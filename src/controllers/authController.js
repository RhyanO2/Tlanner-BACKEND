const {createUser, getUserByEmail} = require('../models/userModel');
const userAuth = require('../models/userModel');
const jwtService = require('../services/jwtService');
const bcrypt = require('bcrypt');

module.exports = {
  Register: async (req, res) => {

    const { name, email, password } = req.body ;
    
    try {
      const createdUser = await getUserByEmail(email);
      if(createdUser ===0){

      
      const hash = await bcrypt.hash(password, 10);
      await createUser(name,email,hash);

      res.status(201).send('Usuário Criado!');
      }else{
        res.status(409).send('Esse email já foi registrado!');
      }
      
    } catch (err) {
      res.status(500).json({
        error: `${err}`
      });
    
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
        // console.log(user.password);
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
