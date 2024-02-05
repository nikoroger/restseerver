const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivoSubir } = require('../middlewwares');
const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

router.post( '/', validarArchivoSubir,  cargarArchivo );


router.put( '/:coleccion/:id', [

    check('id', 'El id debe ser un ID de Mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos']) ),
    validarArchivoSubir,
    validarCampos

], actualizarImagen );

router.get( '/:coleccion/:id', [

    check('id', 'El id debe ser un ID de Mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos']) ),
    validarCampos

], mostrarImagen );


module.exports = router;