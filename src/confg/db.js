const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const sequelize = new Sequelize('process.env.DB_NAME', 'process.env.DB_USER', 'process.env.DB_PASSWORD', {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});
db.getConnection()
  .then(() => console.log('Conectado ao MySQL com sucesso'))
  .catch((err) => console.error('Erro ao conectar ao MySQL:', err));

  
  async function createTable() {
    const createTableQuery = `
create table if not exists Usuarios (
 id int auto_increment primary key,
 Nome varchar(250) not null,
 email varchar (250) not null,
 sobrenome varchar(250),
 senhaHash varchar(250) not null,
 rua varchar(250),
 cidade varchar(250)
);
    `;
  
    try {
      await db.query(createTableQuery);
    } catch (error) {
      console.error('Erro ao criar a tabela:', error);
    }
  } 
module.exports = {db, createTable};
