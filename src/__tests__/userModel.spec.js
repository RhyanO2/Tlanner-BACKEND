const bcrypt = require('bcrypt');
const pool = require('../config/database');
const { createUser, getUserByEmail, getUserById,EditUser,DeleteUser } = require('../models/userModel'); // ajuste o caminho

jest.mock('bcrypt', () => ({
  hash: jest.fn(), 
}));

jest.mock('../config/database', () => ({
  query: jest.fn(),
}));


describe('UserModel Tests', () => {
  it('Deve CRIAR usuário e retornar os dados', async () => {
    const mockData = {
      name: 'Rhyan',
      email: 'rhyan@mail.com',
      password: '123456',
    };

    bcrypt.hash.mockResolvedValue('hashed-pass');


    pool.query.mockResolvedValueOnce([]);
    
    pool.query.mockResolvedValueOnce([
      [{ name: 'Rhyan', email: 'rhyan@mail.com' }],
    ]);

    const results = await createUser(mockData);

    expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);

    expect(pool.query).toHaveBeenCalledWith(
      'INSERT INTO User (name,email,password) VALUES (?,?,?)',
      ['Rhyan', 'rhyan@mail.com', 'hashed-pass']
    );

    expect(pool.query).toHaveBeenCalledWith(
      'SELECT name, email FROM User  WHERE email=?',
      ['rhyan@mail.com']
    );

    expect(results).toEqual([{
      name: 'Rhyan',
      email: 'rhyan@mail.com',
    }]);
  });

  it('Deve RETORNAR um usuário que foi registrado buscando pelo email', async () => {
    const mockData = {
      email: 'rhyan@mail.com',
    };

    pool.query.mockResolvedValueOnce([
      { name: 'Rhyan',
      email: 'rhyan@mail.com',
      senha: '123',
     },
    ]);

    const results = await getUserByEmail(mockData);


    expect(pool.query).toHaveBeenCalledWith(
      'SELECT * FROM User  WHERE email=?',
      ['rhyan@mail.com']
    );


    expect(results).toEqual([{
      name: 'Rhyan',
      email: 'rhyan@mail.com',
      senha: '123',
    }]);
  });

  it('Deve RETORNAR um usuário buscando pelo seu id',async()=>{
    const mockData = {
      id: 1,
    };

    pool.query.mockResolvedValue([{
      name:'User',
      email:'email@em.com',
    }]);

    const results = await getUserById(mockData.id);
    expect(pool.query).toHaveBeenCalledWith('SELECT name, email FROM User WHERE id=?', [
      mockData.id]
    );
  
    expect(results).toEqual({
      name:'User',
      email:'email@em.com',
    });

  });

  it('Deve EDITAR os dados de um usuário',async()=>{
    const mockData ={
      name: 'EditingName',
      email: 'emial@em.com',
      id: 2,
    };

    pool.query.mockResolvedValueOnce([]);

    const results= await EditUser(mockData,mockData.id);

    expect(pool.query).toHaveBeenCalledWith('UPDATE User SET name=?, email=? WHERE id=?',[
      mockData.name,
      mockData.email,
      mockData.id,
    ]);

    expect(results).toEqual('Usuário Editado!');

  });

  it('Deve EXCLUIR um usuário pelo seu id', async()=>{
    const mockData={
      id:1
    };

    pool.query.mockResolvedValueOnce([]);

    const results = await DeleteUser(mockData.id);
    expect(pool.query).toHaveBeenCalledWith("DELETE FROM User WHERE id=?", [mockData.id]);

    expect(results).toEqual('Usuário Excluido!');

  });
});