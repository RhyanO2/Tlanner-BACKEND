const task = require("../models/tasksModel");

module.exports = {
  GetTasksFromUser: async (req, res) => {
    try {
      const userId = req.params.id;

      const results = await task.QueryTasksFormUserId(userId);
      res.status(200).send(results);
    } catch (err) {
      res.send("deu ruim");
      console.log(err);
    }
  },

  PostTask: async (req, res) => {
    try {
      const taskData = req.body;
      const results = await task.CreateTask(taskData);
      res.status(201).send(results);
    } catch (err) {
      res.status(500).send("Erro ao criar a task, tente novamente!");
      console.log(err)
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
