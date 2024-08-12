import { ObjectId } from 'mongodb';

export async function getMilkProductionByMonth(req, res) {
    try {
        const { farmerId, startDate, endDate } = req.query;

        console.log('Received farmerId:', farmerId);
        
        const farmer = await req.db.collection('farmer').findOne({ _id: new ObjectId(farmerId) });

        if (!farmer) {
            console.log('Farmer not found');
            return res.status(404).json({ error: 'Fazendeiro não encontrado' });
        }

        console.log('Farmer found:', farmer);

        const milkProduction = farmer.milkProduction.filter(production => {
            const date = new Date(production.date);
            return date >= new Date(startDate) && date <= new Date(endDate);
        });

        const productionByMonth = milkProduction.reduce((acc, production) => {
            const month = new Date(production.date).toISOString().slice(0, 7); // YYYY-MM
            if (!acc[month]) acc[month] = { liters: 0, rule: null, price: 0 };
            acc[month].liters += production.liters;
            return acc;
        }, {});

        for (const month in productionByMonth) {
            const rule = await req.db.collection('rules').findOne({ mesVigencia: month });
            productionByMonth[month].rule = rule;

            if (rule) {
                const { precoBase, custoPorKm, distanciaAteFabrica, bonusProducao } = rule;
                const { liters } = productionByMonth[month];
                const price = (liters * precoBase) - (custoPorKm * distanciaAteFabrica) + (bonusProducao * liters);
                productionByMonth[month].price = price;
            }
        }

        res.status(200).json(productionByMonth);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
};