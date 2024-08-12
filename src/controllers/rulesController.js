import { ObjectId } from 'mongodb';

// Create
export async function createRule(req, res) {
    try {
        const rulesCollection = await req.db.collection('rules');
        const rule = req.body;
        const result = await rulesCollection.insertOne(rule);
        const createdRule = await rulesCollection.findOne({ _id: result.insertedId });
        res.status(201).send(createdRule);
    } catch (err) {
        console.log(err);
        res.status(500).send('Erro ao criar a regra');
    }
}

// Read
export async function getRules(req, res) {
    try {
        const rulesCollection = await req.db.collection('rules');
        const rules = await rulesCollection.find({}).toArray();
        res.status(200).send(rules);
    } catch (err) {
        res.status(500).send('Erro ao obter as regras');
    }
}

export async function getRuleById(req, res) {
    try {
        const rulesCollection = await req.db.collection('rules');
        const rule = await rulesCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!rule) {
            res.status(404).send('Regra não encontrada');
        } else {
            res.status(200).send(rule);
        }
    } catch (err) {
        res.status(500).send('Erro ao obter a regra');
    }
}

// Update
export async function updateRule(req, res) {
    try {
        const rulesCollection = await req.db.collection('rules');
        const rule = req.body;
        const result = await rulesCollection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: rule });
        if (result.matchedCount === 0) {
            res.status(404).send('Regra não encontrada');
        } else {
            res.status(200).send('Regra atualizada com sucesso');
        }
    } catch (err) {
        res.status(500).send('Erro ao atualizar a regra');
    }
}
// Delete
export async function deleteRule(req, res) {
    try {
        
        const rulesCollection=await req.db.collection('rules');
        const result = await rulesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
            res.status(404).send('Regra não encontrada');
        } else {
            res.status(200).send('Regra deletada com sucesso');
        }
    } catch (err) {
        res.status(500).send('Erro ao deletar a regra');
    }
}