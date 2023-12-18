require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');


const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/Login`, {
    // logging: console.log, // descomenta para ver las consultas SQL en la consola
    logging: false, // descomenta para ver las consultas SQL en la consola
  native: false, // indica a Sequelize que puede usar pg-native para ~30% más de velocidad
});

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { User } = sequelize.models;

// Opcion 1
// sequelize 
//   .authenticate()
//   .then(() => {
//     console.log('Conexión exitosa con la base de datos');
//   })
//   .catch((error) => {
//     console.error('Error al conectar con la base de datos:', error);
//   });

// sugerencia para cargar las tablas por si no se reflejan en Pgadmin u powershell
  sequelize.sync()
  .then(() => {
    console.log('Tablas sincronizadas con éxito.');
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
  });

module.exports = {
  User,
  conn: sequelize,
};

