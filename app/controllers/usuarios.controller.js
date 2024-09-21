const db = require('../config/db.config.js');
const Usuarios = db.Usuarios;

exports.create = (req, res) => {
    let usuario = {};

    try {
        // Construyendo el objeto Usuario desde el cuerpo de la solicitud
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.direccion = req.body.direccion;
        usuario.telefono = req.body.telefono;
        usuario.email = req.body.email;
        usuario.fecha_registro = req.body.fecha_registro;
        usuario.estado = req.body.estado;

        // Guardar en la base de datos
        Usuarios.create(usuario).then(result => {
            res.status(200).json({
                message: "Usuario agregado con éxito, con id = " + result.id_usuario,
                usuario: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

exports.getUsuarioById = (req, res) => {
    let usuarioId = req.params.id;
    Usuarios.findByPk(usuarioId)
        .then(usuario => {
            res.status(200).json({
                message: "Se obtuvo con éxito el usuario con id = " + usuarioId,
                usuario: usuario,
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuarios.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No se pudo actualizar el usuario con id = " + usuarioId,
                usuario: "",
                error: "404"
            });
        } else {
            // Actualizar con los nuevos datos
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                email: req.body.email,
                fecha_registro: req.body.fecha_registro,
                estado: req.body.estado
            }
            let result = await Usuarios.update(updatedObject, { returning: true, where: { id_usuario: usuarioId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el usuario con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Se actualizó el usuario con id = " + usuarioId,
                usuario: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el usuario con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuarios.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No existe el usuario con id = " + usuarioId,
                error: "404",
            });
        } else {
            await usuario.destroy();
            res.status(200).json({
                message: "Usuario eliminado con id = " + usuarioId,
                usuario: usuario,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el usuario con id = " + req.params.id,
            error: error.message,
        });
    }
}

exports.getAllUsuarios = (req, res) => {
    // Obtener toda la información de los usuarios
    Usuarios.findAll()
        .then(usuariosInfos => {
            res.status(200).json({
                message: "Información de todos los usuarios obtenida con éxito!",
                usuarios: usuariosInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}
