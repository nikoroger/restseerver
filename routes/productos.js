const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, 
        validarJWT, 
        esAdminRole} = require('../middlewwares');


const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');

const router = Router();

router.post('/', [

    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('categoria', 'No es un ID de Mongo Válido').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos

] , crearProducto );

router.get('/', obtenerProductos );

router.get('/:id', [
    
    check('id', 'No es un ID de Mongo Válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos

], obtenerProducto );

router.put('/:id', [

    validarJWT,   
    check('id').custom( existeProductoPorId ),
    check('id', 'No es un ID de Mongo Válido').isMongoId(),
    check('categoria', 'No es un ID de Mongo Válido').isMongoId(),
    validarCampos

] , actualizarProducto);

router.delete('/:id', [

    validarJWT,
    esAdminRole,
    check('id', 'No es un ID de Mongo Válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos

], borrarProducto);


module.exports = router;