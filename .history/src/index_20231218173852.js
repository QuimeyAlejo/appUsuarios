
const express = require('express');
const cors = require('cors');
const db = require('../src/db');  // Ajusta la ruta según la ubicación de tu archivo db.js
const createAcount = require('./controller/userController.js')
const app = express();

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

// Ruta específica para manejar operaciones relacionadas con usuarios
app.post('/user', createAcount );

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});


// app.use('/users', userRoutes);