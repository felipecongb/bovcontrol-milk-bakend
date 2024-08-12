/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - address
 *         - registrationNumber
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *           description: ID do usuário
 *         name:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: Email do usuário
 *         password:
 *           type: string
 *           description: Senha do usuário
 *         address:
 *           type: object
 *           description: Endereço do usuário
 *           properties:
 *             street:
 *               type: string
 *               description: Rua do endereço
 *             city:
 *               type: string
 *               description: Cidade do endereço
 *             state:
 *               type: string
 *               description: Estado do endereço
 *             postalCode:
 *               type: string
 *               description: CEP do endereço
 *         registrationNumber:
 *           type: string
 *           description: Matrícula de propriedade
 *         milkProduction:
 *           type: array
 *           description: Produção leiteira do usuário
 *           items:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Data da produção
 *               liters:
 *                 type: number
 *                 description: Quantidade de litros produzidos
 *               farmId:
 *                 type: string
 *                 description: ID da propriedade
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do usuário
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data de atualização do usuário
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */

/**
 * @swagger
 * /users/{id}/milkProduction:
 *   post:
 *     summary: Adiciona uma nova produção leiteira para um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Data da produção
 *               liters:
 *                 type: number
 *                 description: Quantidade de litros produzidos
 *               farmId:
 *                 type: string
 *                 description: ID da propriedade
 *     responses:
 *       200:
 *         description: Produção leiteira adicionada com sucesso
 *       404:
 *         description: Usuário não encontrado
 */

/**
 * @swagger
 * /users/{id}/milkProduction/{productionId}:
 *   put:
 *     summary: Atualiza uma produção leiteira de um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *       - in: path
 *         name: productionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da produção leiteira
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Data da produção
 *               liters:
 *                 type: number
 *                 description: Quantidade de litros produzidos
 *               farmId:
 *                 type: string
 *                 description: ID da propriedade
 *     responses:
 *       200:
 *         description: Produção leiteira atualizada com sucesso
 *       404:
 *         description: Produção leiteira não encontrada
 */

/**
 * @swagger
 * /users/{id}/milkProduction/{productionId}:
 *   delete:
 *     summary: Deleta uma produção leiteira de um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *       - in: path
 *         name: productionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da produção leiteira
 *     responses:
 *       200:
 *         description: Produção leiteira deletada com sucesso
 *       404:
 *         description: Produção leiteira não encontrada
 */
