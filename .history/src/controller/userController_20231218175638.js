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
};

module.exports = { createAccount };
