const { User } = require('../db.js');

const createAccount = async (req, res) => {
  try {
    const { nombre, apellido, correo, contraseña, fechaNacimiento } = req.body;

    // Verifica si el correo ya está registrado
    const existingUser = await User.findOne({
      where: {
        correo: correo,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }

    // Crea un nuevo usuario
    const newUser = await User.create({
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      contraseña: contraseña,
      fechaNacimiento: fechaNacimiento,
    });

    res.status(201).json({ message: 'Cuenta registrada con éxito.', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la solicitud.' });
  }
  const getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).send({ error: 'Usuario no encontrado' });
      }
  
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error interno del servidor' });
    }
  };
  
  // Obtener un usuario por correo electrónico
  const getUserByEmail = async (req, res) => {
    try {
      const { email } = req.params;
      const user = await User.findOne({ where: { correo: email } });
  
      if (!user) {
        return res.status(404).send({ error: 'Usuario no encontrado' });
      }
  
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error interno del servidor' });
    }
  };
};

module.exports = { createAccount
    , getUserById
    ,getUserByEmail };
