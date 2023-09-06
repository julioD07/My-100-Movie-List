import supertest from "supertest";
import mongoose from "mongoose";
import Server from "../../www/server.js";
import dotenv from 'dotenv';
import { pelicula, usuarioInvalido, usuarioValido } from "../data/data.js";


// ! Llamamos el metodo de dotenv
dotenv.config();

let app;

beforeAll(async () => {
    // Realiza la conexión a la base de datos antes de iniciar las pruebas
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    app = new Server().obtenerApp();
});

afterAll(async () => {
    // Cierra la conexión a la base de datos después de que se ejecutan las pruebas
    await mongoose.disconnect();
});


describe('Pruebas unitarias de Peliculas', () => {

    let token
    let idPelicula

    // Ahora puedes escribir tus pruebas utilizando 'app' y 'supertest'
    test('Test de Login Usuario Valido', async () => {
        const response = await supertest(app)
            .post('/api/auth/login')
            // TODO Enviamos json de correo y contraseña
            .send(usuarioValido)
            // TODO Esperamos que el status sea 200
        expect(response.status).toBe(200)

        // TODO Obtenemos el token
        token = response.body.token    
    });
    //TODO Hacemos un test para obtener peliculas
    test('Test de Obtener Peliculas', async () => {
        const response = await supertest(app)
            .get('/api/peliculas/obtener')
            // TODO Enviamos el token
            .set('x-token', `${token}`)
            // TODO Esperamos que el status sea 200
        expect(response.status).toBe(200)
    })

    // TODO Hacemos un test para crear una pelicula
    test('Test de Crear Pelicula', async () => {
        const response = await supertest(app)
            .post('/api/peliculas/crear')
            // TODO Enviamos el token
            .set('x-token', `${token}`)
            // TODO Enviamos el json de la pelicula
            .send(pelicula)
            
        // TODO Esperamos que el status sea 201
        expect(response.status).toBe(201)

        // TODO Obtenemos el ID de la pelicula creada
        idPelicula = response.body.idPeliculaCreada
    })

    // TODO Hacemos un test para calificar una pelicula
    test('Test de Actualizar Pelicula', async () => {
        const response = await supertest(app)
            .post(`/api/peliculas/calificar`)
            // TODO Enviamos el token
            .set('x-token', `${token}`)
            // TODO Enviamos el json de la pelicula
            .send({ 
                "uidListaPeliculas": idPelicula, 
                "cal": 5
            })
        // TODO Esperamos que el status sea 200
        expect(response.status).toBe(200)
    })

    // TODO Hacemos un test para eliminar una pelicula
    test('Test de Eliminar Pelicula', async () => {
        const response = await supertest(app)
            .delete(`/api/peliculas/eliminar/${idPelicula}`)
            // TODO Enviamos el token
            .set('x-token', `${token}`)
            // TODO Esperamos que el status sea 200
            expect(response.status).toBe(200)
    })
})
