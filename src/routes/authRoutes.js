const express = require('express');
const authController = require('../controllers/authController');
const pool = require("../config/database");

const router = express.Router();
/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: E-mail já cadastrado
 *       500:
 *         description: Erro interno no servidor
 */

router.post('/register', authController.Register);
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Realiza login de um usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Credenciais inválidas
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno no servidor
 */

router.post('/login', authController.Login);
router.get('/a', async()=>{
    try {
  const results = await pool.query("SELECT 1");
  console.log("MySQL OK", results);
} catch (err) {
  console.error("ERRO MySQL:", err);
}

});

module.exports = router;