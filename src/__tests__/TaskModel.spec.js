
const pool = require('../config/database');
const { DeleteTask } = require('../controllers/tasksController');
const {
  QueryTasksFromUserId,
  CreateTask,
  EditTask,
  RemoveTask,
} = require('../models/tasksModel');


jest.mock('../config/database', () => ({
  query: jest.fn(),
}));

describe('Task Model Tests', () => {
  it('Create Tasks', async () => {//////////////////////Create//////////////
    const mockData = {
      name: 'Do Some',
      description: 'Something',
      status: 'PENDENTE',
      prazo: '2025-06-11',
      id_user: 1,
    };

    pool.query.mockResolvedValueOnce([]);

    const results = await CreateTask(mockData);

    expect(pool.query).toHaveBeenCalledWith(
      'INSERT INTO Task (name,description,status,prazo,id_user) VALUES (?,?,?,?,?)',
      ['Do Some', 'Something', 'PENDENTE', '2025-06-11', 1],
    );

    expect(results).toEqual('Task Criada!');
  });
  it('Query Task From UserId', async () => {//////////////////Read/////////////

    const mockData={
        id: 1,
    }

    pool.query.mockResolvedValueOnce([
          [{ name: 'Do Some',
            status: 'PENDENTE',
            prazo: '2025-06-11',
        },
    ]
        ]);


    const rows = await QueryTasksFromUserId(mockData.id);
    expect(pool.query).toHaveBeenCalledWith(`SELECT Task.name,Task.status,Task.prazo 
        from User 
        INNER JOIN Task ON User.id  = Task.id_user
        WHERE User.id = ?`,[mockData.id]);

    expect(rows).toEqual([{ name: 'Do Some',
            status: 'PENDENTE',
            prazo: '2025-06-11',}]);
  });



  it('Edit Especific Task',async()=>{///////Edit///////
    const mockData ={
        name: 'Task',
        description: 'Task that i have to do',
        status: 'REALIZADA',
        prazo: '2025-12-25',
        id: 1,
    };

    pool.query.mockResolvedValueOnce([mockData]);

    const results = await EditTask(mockData,mockData.id);
    expect(pool.query).toHaveBeenCalledWith("UPDATE Task SET name=?, description=?,status=?,prazo=? WHERE id=?",
      ['Task', 'Task that i have to do', 'REALIZADA', '2025-12-25',mockData.id]);
    
    expect(results).toEqual('Task Atualizada!')
  });

  it('Delete Task',async()=>{
    const mockId ={
        id:1,
    };

    pool.query.mockResolvedValueOnce([]);

    const results = await RemoveTask(mockId);
    expect(pool.query).toHaveBeenCalledWith('DELETE FROM Task WHERE id=?', [mockId])

    expect(results).toEqual('Task Excluída')

  });
});
