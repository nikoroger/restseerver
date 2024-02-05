const validarCampos = require('../middlewwares/validar-campos');
const validarJWT = require('../middlewwares/validar-jwt');
const tieneRoles  = require('../middlewwares/validar-roles');
const validarArchivoSubir = require('../middlewwares/validar-archivo');


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...tieneRoles,
    ...validarArchivoSubir
}