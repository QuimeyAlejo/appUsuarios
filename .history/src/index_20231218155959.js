
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
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

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
