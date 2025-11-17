const pool = require("../config/database");

module.exports = {
  QueryTasksFormUserId: async (userId) => {
    const [rows] = await pool.query(
      `SELECT Task.name,Task.status,Task.prazo 
        from User 
        INNER JOIN Task ON User.id  = Task.id_user
        WHERE User.id = ?`,
      [userId],
    );

    return rows;
  },
  CreateTask: async (taskData) => {
    const { name, description, status, prazo, id_user } = taskData;

    await pool.query(
      "INSERT INTO Task (name,description,status,prazo,id_user) VALUES (?,?,?,?,?)",
      [name, description, status, prazo, id_user]
    );

    return "Task Criada!";
  },

  EditTask: async (taskData, taskId) => {
    const { name, description, status, prazo } = taskData;

    await pool.query(
      "UPDATE Task SET name=?, description=?,status=?,prazo=? WHERE id=?",
      [name, description, status, prazo, taskId]
    );

    return "Task Atualizada!";
  },
  RemoveTask: async (taskId) => {
    await pool.query("DELETE FROM Task WHERE id=?", [taskId]);

    return "Task Excluída";
  },
};
