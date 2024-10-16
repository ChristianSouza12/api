// routes/users.js
import express from 'express'; // Importa o express para criar rotas
import bcrypt from "bcryptjs"; // Importa bcryptjs para criptografar senhas
import jwt from 'jsonwebtoken'; // Importa jsonwebtoken para gerar tokens JWT
import User from "../models/User.js"; // Importa o modelo User

const router = express.Router(); // Cria uma instância do roteador

// Rota de registro
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body; // Extrai os dados do corpo da requisição

    try {
        // Criptografa a senha antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10); // O segundo argumento é o número de rounds

        const newUser = await User.create({ name, email, password: hashedPassword }); // Cria um novo usuário no banco de dados
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: newUser }); // Retorna resposta de sucesso
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error); // Log do erro no console
        res.status(500).json({ message: 'Erro ao cadastrar usuário' }); // Retorna erro interno do servidor
    }
});

// Rota de login
router.post('/login', async (req, res) => {
    console.log('Login solicitado com:', req.body); // Log do corpo da requisição

    const { email, password } = req.body; // Extrai os dados do corpo da requisição

    try {
        console.log('Tentativa de login com email:', email); // Log do email usado para login
        // Encontra o usuário pelo email
        const user = await User.findOne({ where: { email } });

        // Verifica se o usuário existe
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' }); // Retorna 404 se o usuário não for encontrado
        }

        // Verifica a senha
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha inválida' }); // Retorna 401 se a senha estiver incorreta
        }

        // Gera o token JWT
        const token = jwt.sign({ id: user.id }, 'teste', { expiresIn: '1h' }); // Troque 'teste' por uma chave secreta real
        res.status(200).json({ message: 'Login bem-sucedido', token }); // Retorna resposta de sucesso com o token
    } catch (error) {
        console.error('Erro ao fazer login:', error); // Log do erro no console
        res.status(500).json({ message: 'Erro ao fazer login' }); // Retorna erro interno do servidor
    }
});

export default router; // Exporta o roteador para ser utilizado em outras partes da aplicação
