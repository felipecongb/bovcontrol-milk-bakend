import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const authController = {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const db = req.db; // Get the MongoDB native driver connection from req.db

            const user = await db.collection('farmer').findOne({ email }); // Use the connection to query the 'users' collection
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Senha incorreta' });
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.json({ user, token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao autenticar usuário' });
        }
    },
};

export default authController;
