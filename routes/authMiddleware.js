import jwt from 'jsonwebtoken'; // Importa a biblioteca 'jsonwebtoken' para trabalhar com JSON Web Tokens (JWT).

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
  // Extrai o token do cabeçalho Authorization da requisição
  const token = req.headers['authorization'];

  // Verifica se o token foi fornecido
  if (!token) {
    // Se o token não estiver presente, retorna um erro 401 (não autorizado)
    return res.status(401).json({ message: 'Acesso negado! Token não fornecido.' });
  }

  try {
    // Remove o "Bearer " do token e verifica se ele é válido
    const verified = jwt.verify(token.split(" ")[1], 'seu-segredo'); // Substitua 'seu-segredo' pela sua chave secreta real
    req.user = verified; // Anexa os dados do usuário verificado ao objeto de requisição
    next(); // Chama o próximo middleware ou rota na pilha de execução
  } catch (error) {
    // Se o token for inválido ou ocorrer um erro, retorna um erro 400 (solicitação inválida)
    res.status(400).json({ message: 'Token inválido!' });
  }
};

// Exporta o middleware para ser usado em outras partes da aplicação
export default authMiddleware;
