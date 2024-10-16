// models/User.js
import { Model, DataTypes } from 'sequelize'; // Importa as classes Model e DataTypes da biblioteca 'sequelize'.
import sequelize from "../config/database.js"; // Importa a instância do Sequelize configurada anteriormente.

class User extends Model {} // Define a classe User que herda de Model.

User.init({
    // Define os atributos do modelo User.
    name: {
        type: DataTypes.STRING, // Define o tipo de dado como STRING.
        allowNull: false, // Este campo não pode ser nulo.
    },
    email: {
        type: DataTypes.STRING, // Define o tipo de dado como STRING.
        allowNull: false, // Este campo não pode ser nulo.
        unique: true, // Garante que o email seja único entre os registros no banco de dados.
    },
    password: {
        type: DataTypes.STRING, // Define o tipo de dado como STRING.
        allowNull: false, // Este campo não pode ser nulo.
    },
}, {
    sequelize, // Passa a instância do Sequelize para o modelo.
    modelName: 'User', // Define o nome do modelo, que será usado para referenciar a tabela no banco de dados.
});

// Exporta o modelo User para que possa ser utilizado em outras partes da aplicação.
export default User;
