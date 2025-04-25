//Define las rutas para cada operación del controlador.

import express from 'express';

import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller, 
    agregarSuperHeroesController, modificarSuperHeroesporIdController,
    eliminarSuperHeroePorIdController,
    eliminarSuperHeroePorNombreController
} from '../controllers/superheroesController.mjs';

const router = express.Router();

router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);

//Sprint 3 - TP1
router.get('/heroes', obtenerTodosLosSuperheroesController);
router.post('/heroes/nuevo/agregarheroes', agregarSuperHeroesController);
router.put('/heroes/actualizar/:id/:atributo/:valor', modificarSuperHeroesporIdController );
router.delete('/heroes/eliminar/id/:id', eliminarSuperHeroePorIdController);
router.delete('/heroes/name1/:nombre', eliminarSuperHeroePorNombreController);
export default router;