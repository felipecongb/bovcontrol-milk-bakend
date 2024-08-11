import { ObjectId } from 'mongodb';

export const getAllUsers = async (req, res) => {
    try {
        const users = await req.db.collection('users').find().toArray();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const result = await req.db.collection('users').insertOne(req.body);
        res.status(201).json(result.ops[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await req.db.collection('users').findOne({ _id: ObjectId(req.params.id) });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const result = await req.db.collection('users').updateOne(
            { _id: ObjectId(req.params.id) },
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
        const result = await req.db.collection('users').deleteOne({ _id: ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};