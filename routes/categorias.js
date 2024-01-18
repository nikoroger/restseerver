const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, 
        validarJWT, 
        esAdminRole} = require('../middlewwares');

const { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoria, 
        actualizarCategoria, 
        borrarCategoria } = require('../controllers/categorias');

const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerCategorias );

router.get('/:id', [
    
    check('id', 'No es un ID de Mongo Válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos

], obtenerCategoria );

router.post('/', [

    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos

] , crearCategoria );

router.put('/:id', [

    validarJWT,
    check('nombre', 'El nombre es obligarotio').not().notEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos

] , actualizarCategoria);

router.delete('/:id', [

    validarJWT,
    esAdminRole,
    check('id', 'No es un ID de Mongo Válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos

], borrarCategoria);

module.exports = router;