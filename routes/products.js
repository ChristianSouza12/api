import { Router } from 'express'; // Importa a classe Router do Express para criar rotas

const router = Router(); // Cria uma instância do roteador

// Array de produtos - um banco de dados simulado
const products = [
  { id: 1, name: "Smartphone", price: 2000, category: "eletronicos", subcategory: "Celulares" },
  { id: 2, name: "Notebook", price: 3500, category: "eletronicos", subcategory: "Notebooks" },
  { id: 3, name: "Jaqueta Masculina", price: 300, category: "moda", subcategory: "Masculino" },
  { id: 4, name: "Vestido Feminino", price: 150, category: "moda", subcategory: "Feminino" },
  { id: 5, name: "Tênis Masculino", price: 400, category: "moda", subcategory: "Masculino" },
  { id: 6, name: "Bolsa Feminina", price: 250, category: "moda", subcategory: "Feminino" },
  { id: 7, name: "Tablet", price: 1500, category: "eletronicos", subcategory: "Tablets" },
  { id: 8, name: "Monitor", price: 800, category: "eletronicos", subcategory: "Acessórios" },
  { id: 9, name: "Fone de Ouvido", price: 200, category: "eletronicos", subcategory: "Acessórios" },
  { id: 10, name: "Câmera Digital", price: 1200, category: "eletronicos", subcategory: "Câmeras" },
  { id: 11, name: "Smartwatch", price: 900, category: "eletronicos", subcategory: "Acessórios" },
  { id: 12, name: "Micro-ondas", price: 700, category: "eletrodomésticos", subcategory: "Cozinha" },
  { id: 13, name: "Geladeira", price: 2500, category: "eletrodomésticos", subcategory: "Cozinha" },
  { id: 14, name: "Fogão", price: 1200, category: "eletrodomésticos", subcategory: "Cozinha" },
  { id: 15, name: "Liquidificador", price: 300, category: "eletrodomésticos", subcategory: "Cozinha" },
  { id: 16, name: "Batedeira", price: 400, category: "eletrodomésticos", subcategory: "Cozinha" },
  { id: 17, name: "Camisa Masculina", price: 80, category: "moda", subcategory: "Masculino" },
  { id: 18, name: "Calça Jeans Masculina", price: 150, category: "moda", subcategory: "Masculino" },
  { id: 19, name: "Saia Feminina", price: 90, category: "moda", subcategory: "Feminino" },
  { id: 20, name: "Blusa Feminina", price: 70, category: "moda", subcategory: "Feminino" },
  { id: 21, name: "Tênis Feminino", price: 500, category: "moda", subcategory: "Feminino" },
  { id: 22, name: "Chinelo", price: 30, category: "moda", subcategory: "Feminino" },
  { id: 23, name: "Óculos de Sol", price: 150, category: "acessórios", subcategory: "Moda" },
  { id: 24, name: "Relógio Masculino", price: 600, category: "acessórios", subcategory: "Moda" },
  { id: 25, name: "Relógio Feminino", price: 650, category: "acessórios", subcategory: "Moda" }
];

// Rota para obter todos os produtos
router.get('/', (req, res) => {
  res.json(products); // Retorna a lista de produtos em formato JSON
});

// Rota para obter um produto específico por ID
router.get('/:id', (req, res) => {
  // Busca o produto pelo ID fornecido na URL
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Produto não encontrado'); // Retorna 404 se o produto não for encontrado
  res.json(product); // Retorna o produto encontrado em formato JSON
});

// Rota para adicionar um novo produto
router.post('/', (req, res) => {
  const { name, price, category, subcategory } = req.body; // Extrai os dados do produto do corpo da requisição

  // Verifica se todos os campos necessários foram fornecidos
  if (!name || !price || !category || !subcategory) {
    return res.status(400).send('Todos os campos são obrigatórios'); // Retorna 400 se algum campo estiver faltando
  }

  // Cria um novo produto com um ID gerado automaticamente
  const newProduct = {
    id: products.length + 1,
    name,
    price: parseFloat(price), // Converte o preço para um número de ponto flutuante
    category,
    subcategory
  };

  products.push(newProduct); // Adiciona o novo produto ao array de produtos
  res.status(201).json(newProduct); // Retorna o novo produto em formato JSON com status 201 (Criado)
});

// Rota para obter todas as categorias sem duplicatas
router.get('/categories/all', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))]; // Cria um conjunto de categorias únicas
  res.json(categories); // Retorna as categorias em formato JSON
});

// Rota para obter todas as subcategorias sem duplicatas
router.get('/subcategories/all', (req, res) => {
  const subcategories = [...new Set(products.map(p => p.subcategory))]; // Cria um conjunto de subcategorias únicas
  res.json(subcategories); // Retorna as subcategorias em formato JSON
});

// Rota para atualizar um produto existente
router.put('/:id', (req, res) => {
  const { id } = req.params; // Obtém o ID do produto a ser atualizado
  const { name, price, category, subcategory } = req.body; // Extrai os novos dados do produto do corpo da requisição

  const productIndex = products.findIndex(p => p.id === parseInt(id)); // Busca o índice do produto no array
  if (productIndex === -1) {
    return res.status(404).send('Produto não encontrado'); // Retorna 404 se o produto não for encontrado
  }

  // Cria um novo objeto de produto com os dados atualizados
  const updatedProduct = {
    id: parseInt(id), // Mantém o ID original
    name,
    price: parseFloat(price), // Converte o novo preço para um número de ponto flutuante
    category,
    subcategory
  };

  products[productIndex] = updatedProduct; // Atualiza o produto no array
  res.status(200).json(updatedProduct); // Retorna o produto atualizado em formato JSON
});

// Rota para deletar um produto
router.delete('/:id', (req, res) => {
  const { id } = req.params; // Obtém o ID do produto a ser deletado
  const productIndex = products.findIndex(p => p.id === parseInt(id)); // Busca o índice do produto no array

  if (productIndex === -1) {
    return res.status(404).send('Produto não encontrado'); // Retorna 404 se o produto não for encontrado
  }

  products.splice(productIndex, 1); // Remove o produto do array
  res.status(204).send(); // Retorna status 204 (Sem Conteúdo) indicando que a operação foi bem-sucedida
});

// Exporta o roteador para ser utilizado em outras partes da aplicação
export default router;
