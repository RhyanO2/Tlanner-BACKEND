const express = require('express');
const taskController = require('../controllers/tasksController');

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Gerenciamento de tarefas dos usuários
 */

/**
 * @swagger
 * /tasks/user/{id}:
 *   get:
 *     summary: Retorna todas as tarefas de um usuário
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Fazer backup
 *                   status:
 *                     type: string
 *                     example: pendente
 *                   prazo:
 *                     type: string
 *                     example: 2025-12-01
 *       404:
 *         description: Nenhuma tarefa encontrada
 *       500:
 *         description: Erro interno no servidor
 */
router.get('user/:id' ,taskController.GetTasksFromUser);
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - status
 *               - prazo
 *               - id_user
 *             properties:
 *               name:
 *                 type: string
 *                 example: Corrigir bug da tela de login
 *               description:
 *                 type: string
 *                 example: Corrigir problema de autenticação no backend
 *               status:
 *                 type: string
 *                 example: em andamento
 *               prazo:
 *                 type: string
 *                 example: 2025-11-30
 *               id_user:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro interno no servidor
 */
router.post('/' ,taskController.PostTask);
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza os dados de uma tarefa existente
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser atualizada
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Revisar código final
 *               description:
 *                 type: string
 *                 example: Ajustar formatação e revisar comentários
 *               status:
 *                 type: string
 *                 example: concluída
 *               prazo:
 *                 type: string
 *                 example: 2025-12-10
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro interno no servidor
 */
router.put('/:id' ,taskController.UpdateTask);
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Remove uma tarefa existente
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser removida
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarefa removida com sucesso
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro interno no servidor
 */
router.delete('/:id' ,taskController.DeleteTask);

module.exports = router;