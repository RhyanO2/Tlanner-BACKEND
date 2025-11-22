const task = require("../models/tasksModel");

module.exports = {
  GetTasksFromUser: async (req, res) => {
    try {
      const userId = req.params.id;

      const results = await task.QueryTasksFromUserId(userId);
      res.status(200).send(results);
    } catch (err) {
      const userId = req.params.id;
    res.send(`Não foi possível encontrar tarefas para o usuário com o ID: ${userId}`);
      console.log(err);
    }
  },

  PostTask: async (req, res) => {
    try {
      const taskData = req.body;
      const results = await task.CreateTask(taskData);
      res.status(201).send(results);
    } catch (err) {
      res.status(500).send({
        message: "Erro ao criar a task, tente novamente!",
        error: err
      });
      throw err
    }
  },

  UpdateTask: async (req, res) => {
    try {
      const taskData = req.body;
      const taskId = req.params.id
      const results = await task.EditTask(taskData,taskId);
      res.status(200).send(results);
    } catch (err) {
      res.status(500).send("Erro ao editar a task, tente novamente!");
      console.log(err);
    }

    return "Task Editada!";
  },

  DeleteTask: async (req,res) => {
    try{
        const taskId = req.body;
        const results = await task.RemoveTask(taskId);
        res.status(200).send(results)
    }catch(err){
        res.status(500).send("Erro ao remover a task, tente novamente!");
    }
  },
};
