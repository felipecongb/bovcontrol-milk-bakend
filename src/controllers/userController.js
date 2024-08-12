import { ObjectId } from 'mongodb';

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

export const createUser = async (req, res) => {
    try {
        const result = await req.db.collection('farmer').insertOne(req.body);
        res.status(201).json(result.ops[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await req.db.collection('farmer').findOne({ _id: new ObjectId(req.params.id) });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const result = await req.db.collection('farmer').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        if (result.matchedCount === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const result = await req.db.collection('farmer').deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const addMilkProduction = async (req, res) => {
    try {
        const result = await req.db.collection('farmer').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $push: { milkProduction: req.body } }
        );
        if (result.matchedCount === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json({ message: 'Produção leiteira adicionada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateMilkProduction = async (req, res) => {
    try {
        const result = await req.db.collection('farmer').updateOne(
            { _id: new ObjectId(req.params.id), 'milkProduction._id': new ObjectId(req.params.productionId) },
            { $set: { 'milkProduction.$': req.body } }
        );
        if (result.matchedCount === 0) return res.status(404).json({ error: 'Produção leiteira não encontrada' });
        res.status(200).json({ message: 'Produção leiteira atualizada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteMilkProduction = async (req, res) => {
    try {
        const result = await req.db.collection('farmer').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $pull: { milkProduction: { _id: new ObjectId(req.params.productionId) } } }
        );
        if (result.matchedCount === 0) return res.status(404).json({ error: 'Produção leiteira não encontrada' });
        res.status(200).json({ message: 'Produção leiteira deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
