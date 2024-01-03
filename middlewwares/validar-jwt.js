const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );    

        // leer el usuario que corresponde al uid

        const usuario = await Usuario.findById( uid );

        if ( !usuario ) {
            return res.status(401).json({
                msg: 'Token NO Válido - Usuario no existe en DB'
            });
        }

        // Verificar si el uid tiene estado true

        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token NO Válido - Usuario con estado false'
            });
        }
        
        req.usuario = usuario;
        
        next();

    } catch (error) {

        console.log(error);    
        return res.status(401).json({
            msg: 'Token NO válido'
        });
    }   


}


module.exports = {
    validarJWT
}