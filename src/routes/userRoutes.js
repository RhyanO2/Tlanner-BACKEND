const express = require('express');
const userController = require('../controllers/userController');
const jwtService = require('../services/jwtService');
const auth = require('../middlewares/auth');

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retorna o usuário dado no req.params
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: João Silva
 *                 email:
 *                   type: string
 *                   example: joao@email.com
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno no servidor
 */

router.get('/:id',auth, userController.GetUserById);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Modifica dados de um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser atualizado
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
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *     responses:
 *       200:
 *         description: Usuário editado com sucesso
 *       400:
 *         description: Requisição inválida
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno no servidor
 */

router.put('/:id',auth, userController.PutUser);



/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Modifica dados de um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser atualizado
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
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *     responses:
 *       200:
 *         description: Usuário editado com sucesso
 *       400:
 *         description: Requisição inválida
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno no servidor
 */
router.delete('/:id',auth, userController.DelUser);

module.exports = router;