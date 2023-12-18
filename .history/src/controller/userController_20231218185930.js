const { User } = require('../db.js');

// Crear una cuenta de usuario
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

// Obtener un usuario por ID
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
  
      // Convierte el valor del correo electrónico a minúsculas para evitar problemas de sensibilidad de mayúsculas y minúsculas
      const lowerCaseEmail = email.toLowerCase();
  
      const user = await User.findOne({ where: { correo: lowerCaseEmail } });
  
      if (!user) {
        return res.status(404).send({ error: 'Usuario no encontrado' });
      }
  
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error interno del servidor' });
    }
  };

  const deleteUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).send({ error: 'Usuario no encontrado' });
      }
      await user.destroy();
      res.status(200).send({message: "Usuario eliminado con exito"}) }
      catch (error) 
      {console.error(error);
        res.status(500).send({message : "Error al eliminar al usuario"})
      }}

      const deleteUserByEmail = async (req, res) => {
        try {
          const { email } = req.params;
          const lowerCaseEmail = email.toLowerCase();
          const user = await User.findOne({ where: { correo: lowerCaseEmail } });
      
          if (!user) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
          }
      
          await user.destroy();
          res.status(200).send({ message: 'Usuario eliminado con éxito' });
        } catch (error) {
          console.error(error);
          res.status(500).send({ error: 'Error interno del servidor' });
        }
      };

module.exports = {
  createAccount,
  getUserById,
  getUserByEmail,
  deleteUserByEmail,
  deleteUserById
};
