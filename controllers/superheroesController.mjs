//Implementa el controlador para gestionar solicitudes HTTP, llamando a services
//Y utilizando las vistas para presentar los datos

import {
    obtenerSuperheroePorId,
    obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo,
    obtenerSuperheroesMayoresDe30,
    agregarNuevoSuperHeroe, modificarSuperHeroeporEdad,
    eliminarSuperHeroePorId,
    eliminarSuperHeroePorNombre
} from '../services/superheroesService.mjs';

import {
    renderizarSuperheroe,
    renderizarListaSuperheroes,
    } from '../views/responseView.mjs';

    
export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const {id} = req.params;
        const superheroe = await obtenerSuperheroePorId(id);
        
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superheroe no encontrado' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el superhéroe',
            error: error.message });
    }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los superhéroes',
            error: error.message });
    }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const {atributo, valor} = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        
        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontraron superhéroes con ese atributo' });
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar los superhéroes',
            error: error.message });
    }
}


export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        
        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontraron superhéroes mayores de 30 años' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send(
            { mensaje: 'Error al obtener superhéroes mayores de 30 años',
            error: error.message });
    }
}

export async function agregarSuperHeroesController(req, res) {
    try {
        const datosSuperheroe = req.body;
        const nuevoSuperheroe = await agregarNuevoSuperHeroe(datosSuperheroe);

        const superheroeFormateado = renderizarSuperheroe(nuevoSuperheroe);
        res.status(201).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al agregar el superhéroe',
            error: error.message
        });
    }
}

export async function modificarSuperHeroesporIdController(req, res) {
    try {
        const { id } = req.params;
        const { edad } = req.body;

        const superheroeModificado = await modificarSuperHeroesporId(id, edad);
        
        if (!superheroeModificado) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado para modificar' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroeModificado);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al modificar el superhéroe',
            error: error.message
        });
    }
}

export async function eliminarSuperHeroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const resultado = await eliminarSuperHeroePorId(id);

        if (!resultado) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado para eliminar' });
        }

        res.status(200).send({ mensaje: 'Superhéroe eliminado correctamente' });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al eliminar el superhéroe',
            error: error.message
        });
    }
}

export async function eliminarSuperHeroePorNombreController(req, res) {
    try {
        const { nombre } = req.params;
        const resultado = await eliminarSuperHeroePorNombre(nombre);

        if (!resultado) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado con ese nombre' });
        }

        res.status(200).send({ mensaje: 'Superhéroe eliminado correctamente por nombre' });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al eliminar el superhéroe por nombre',
            error: error.message
        });
    }
}
