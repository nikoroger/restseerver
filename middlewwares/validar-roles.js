const { response } = require("express");

const esAdminRole = ( req, res = response, next ) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se requiere verificiar el role sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `El ${ nombre } no es administrador - NO puede hacer esto`
        });
    }


    next();
}

const tieneRoles = ( ...roles ) => {

    return ( req, res = response, next ) => {

        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se requiere verificiar el role sin validar el token primero'
            });
        }

        if( !roles.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }

        next();
    }

}

module.exports = {
    esAdminRole,
    tieneRoles
}