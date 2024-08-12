import { ObjectId } from 'mongodb';


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

export const getAllUsers = async (req, res) => {
    try {
        if (!req.db) {
            throw new Error('Database connection is not established');
        }

        const users = await req.db.collection('farmer').find().toArray();

        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: err.message });
    }
};

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
export const createUser = async (req, res) => {
    try {
        const result = await req.db.collection('farmer').insertOne(req.body);
        res.status(201).json(result.ops[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

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
export const getUserById = async (req, res) => {
    try {
        const user = await req.db.collection('farmer').findOne({ _id: ObjectId(req.params.id) });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

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
export const updateUser = async (req, res) => {
    try {
        const result = await req.db.collection('farmer').updateOne(
            { _id: ObjectId(req.params.id) },
            { $set: req.body }
        );
        if (result.matchedCount === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

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
export const deleteUser = async (req, res) => {
    try {
        const result = await req.db.collection('farmer').deleteOne({ _id: ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

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
export const addMilkProduction = async (req, res) => {
    try {
        const { date, liters, farmId } = req.body;
        const result = await req.db.collection('farmer').updateOne(
            { _id: ObjectId(req.params.id) },
            {
                $push: {
                    milkProduction: { date, liters, farmId }
                }
            }
        );
        if (result.matchedCount === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json({ message: 'Produção leiteira adicionada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
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
export const updateMilkProduction = async (req, res) => {
    try {
        const { date, liters, farmId } = req.body;
        const result = await req.db.collection('farmer').updateOne(
            { _id: ObjectId(req.params.id), 'milkProduction._id': ObjectId(req.params.productionId) },
            {
                $set: {
                    'milkProduction.$.date': date,
                    'milkProduction.$.liters': liters,
                    'milkProduction.$.farmId': farmId
                }
            }
        );
        if (result.matchedCount === 0) return res.status(404).json({ error: 'Produção leiteira não encontrada' });
        res.status(200).json({ message: 'Produção leiteira atualizada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

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
export const deleteMilkProduction = async (req, res) => {
    try {
        const result = await req.db.collection('farmer').updateOne(
            { _id: ObjectId(req.params.id) },
            {
                $pull: {
                    milkProduction: { _id: ObjectId(req.params.productionId) }
                }
            }
        );
        if (result.matchedCount === 0) return res.status(404).json({ error: 'Produção leiteira não encontrada' });
        res.status(200).json({ message: 'Produção leiteira deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
