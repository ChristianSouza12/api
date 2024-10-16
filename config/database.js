// config/database.js
import { Sequelize } from 'sequelize'; // Importa a classe Sequelize da biblioteca 'sequelize' para interagir com bancos de dados.

const sequelize = new Sequelize('dev-teste', 'postgres', 'postgres', {
    host: 'localhost', // Define o host do banco de dados (neste caso, é o localhost).
    dialect: 'postgres', // Especifica o tipo de banco de dados que está sendo usado (neste caso, PostgreSQL).
    // Outros dialetos podem incluir 'mysql', 'sqlite', 'mariadb', entre outros.
});

// Exporta a instância do Sequelize para que possa ser usada em outras partes da aplicação.
export default sequelize;
