const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async( rol = '' ) => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });

    if ( existeEmail ) {
        throw new Error(`El correo ${ correo } ya está registrado`);
    }
}

const existeUsuarioPorId = async( id = '' ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findOne({ _id: id  });

    if ( !existeUsuario ) {
        throw new Error(`El ID ${ id } no existe`);
    }
}


  

  module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
  }