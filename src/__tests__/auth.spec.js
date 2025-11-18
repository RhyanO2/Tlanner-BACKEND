// const { pool } = require('./src/config/database');
const { Register, Login } = require('../controllers/authController');
const authModel = require('../models/authModel');

jest.mock('../models/authModel', () => ({
  RegisterUser: jest.fn()
}));

const req = {
  body: {
    name: 'RhyanAZ',
    email: 'RhyanAZ@em.com',
    password: '123',
  },
};

const res = { 
    status: jest.fn().mockReturnThis(),
    send: jest.fn() 
};

describe('Auth', () => {
  it('Register Func', async() => {
    await Register(req,res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith('Usuário Criado!');
    
  });
//   it('login', ()=>{
//     await Login(req)
//   });
});