import express from 'express'; // Importa o express para criar o servidor
import cors from 'cors'; // Importa o middleware CORS para permitir requisições de diferentes origens
import productRoutes from './routes/products.js'; // Importa as rotas de produtos
import userRoutes from './routes/users.js'; // Importa as rotas de usuários
import sequelize from './config/database.js'; // Importa a configuração do Sequelize para conexão com o banco de dados
import authMiddleware from './middlewares/authMiddleware.js'; // Importa o middleware de autenticação

const app = express(); // Cria uma instância do servidor Express

// Middleware para CORS
app.use(cors()); // Permite requisições de diferentes origens

// Middleware para interpretar requisições com JSON
app.use(express.json()); // Interpreta requisições com payload em JSON

// Rotas
app.use('/api/products', productRoutes); // Define a rota base para produtos
app.use('/api/users', userRoutes); // Define a rota base para usuários

// Rota protegida
app.get('/', authMiddleware, (req, res) => {
    res.json({ message: `Bem-vindo, usuário com ID ${req.user.id}` }); // Retorna uma mensagem de boas-vindas ao usuário autenticado
});

// Porta do servidor
const PORT = process.env.PORT || 5000; // Define a porta para o servidor, usando a variável de ambiente ou a porta 5000

// Função para iniciar o servidor
const startServer = async () => {
    try {
        // Sincroniza o banco de dados
        await sequelize.sync(); // Sincroniza os modelos com o banco de dados
        console.log('Banco de dados sincronizado!');

        // Inicia o servidor
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`); // Exibe uma mensagem indicando que o servidor está rodando
        });
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error); // Log do erro se a sincronização falhar
    }
};

// Middleware para lidar com rotas não encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Rota não encontrada' }); // Retorna um erro 404 se a rota não for encontrada
});

// Chama a função para iniciar o servidor
startServer(); // Inicia o servidor
