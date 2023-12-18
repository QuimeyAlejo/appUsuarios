
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres', // Ajusta esto según tu base de datos (mysql, sqlite, etc.)
  logging: false, // Deshabilita los logs de SQL en la consola
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importa los modelos y añádelos al objeto db
db.User = require('./models/User')(sequelize);

// Relaciones entre modelos, si es necesario
// db.User.hasMany(...);
// db.SomeOtherModel.belongsTo(...);

// Sincroniza los modelos con la base de datos
// Solo ejecuta esto si deseas que Sequelize cree automáticamente las tablas según tus modelos
// Puedes comentar esto después de la primera ejecución para evitar recrear las tablas cada vez
// sequelize.sync({ force: true }).then(() => {
//   console.log('Tablas sincronizadas con éxito.');
// }).catch((error) => {
//   console.error('Error al sincronizar las tablas:', error);
// });
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión exitosa con la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });

module.exports = db;
