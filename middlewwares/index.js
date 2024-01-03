const validarCampos = require('../middlewwares/validar-campos');
const validarJWT = require('../middlewwares/validar-jwt');
const tieneRoles  = require('../middlewwares/validar-roles');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...tieneRoles,
}