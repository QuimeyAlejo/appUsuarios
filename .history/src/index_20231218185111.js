
const express = require('express');
const cors = require('cors');
const db = require('../src/db');  // Ajusta la ruta según la ubicación de tu archivo db.js
const app = express();
// const userRoutes = require('./routes/routes.js');
const { createAccount, getUserById,getUserByEmail } = require('./controller/userController.js')
const corsOptions = {
  origin: 'http://localhost:3001', // Reemplaza con tu origen permitido
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));  // Utiliza la configuración personalizada primero

app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


// Ruta para manejar la creación de cuentas de usuario
app.post('/user/create-account', createAccount);
app.get('/user/:id', getUserById)
app.get('/user/email/:email', getUserByEmail)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});


// app.use('/users', userRoutes);