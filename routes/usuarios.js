
const e = require('express');
const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewwares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const router = Router();

router.get('/', usuariosGet);

router.post('/', 

    // VALIDACIONES
    [ check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('password', 'El password es obligatorio').not().isEmpty(),
      check('password', 'El password debe de ser mpas de 6 letras').isLength({ min: 6 }),
      check('correo', 'El correo es obligatorio').not().isEmpty(),
      check('correo', 'El correo no es válido').isEmail(),
      check('correo').custom( emailExiste ),
      //check('rol', 'No es un rol válido').isIn([ 'ADMIN_ROLE', 'USER_ROL' ]),
      check('rol').custom( esRolValido ),
      check('rol', 'El rol es obligatorio').not().isEmpty(),
      validarCampos
    ]
    
,usuariosPost);

router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId().bail().custom( existeUsuarioPorId ),
  check('rol').custom( esRolValido ),
  check('correo', 'El correo no es válido').isEmail(),
  validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id',[
  check('id', 'No es un ID válido').isMongoId().bail().custom( existeUsuarioPorId ),
  validarCampos
],usuariosDelete);



module.exports = router;