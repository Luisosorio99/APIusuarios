module.exports = (sequelize, Sequelize) => {
    const Usuarios = sequelize.define('usuarios', {
      id_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      fecha_registro: {
        type: Sequelize.DATE
      },
      estado: {
        type: Sequelize.ENUM('activo', 'inactivo', 'suspendido')
      }
    });
  
    return Usuarios;
  };
  