import supertest from "supertest";
import mongoose from "mongoose";
import Server from "../../www/server.js";
import dotenv from 'dotenv';
import { usuarioInvalido, usuarioValido } from "../data/data.js";


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


describe('Pruebas unitarias de Login', () => {
    // Ahora puedes escribir tus pruebas utilizando 'app' y 'supertest'
    test('Test de Login Usuario Valido', async () => {
        const response = await supertest(app)
            .post('/api/auth/login')
            // TODO Enviamos json de correo y contraseña
            .send(usuarioValido)
            // TODO Esperamos que el status sea 200
        expect(response.status).toBe(200)
    });


    test('Test de Login Usuario Invalido', async () => {
        const response = await supertest(app)
            .post('/api/auth/login')
            // TODO Enviamos json de correo y contraseña
            .send(usuarioInvalido)
            // TODO Esperamos que el status sea 400
            expect(response.status).toBe(400)
    });

    // TODO Hacemos los test de la respuesta de no enviar un usuario
    test('Test de Login sin usuario', async () => {
        const response = await supertest(app)
            // TODO La peticion sin datos
            .post('/api/auth/login')
            // TODO Esperamos que el status sea 400
            expect(response.status).toBe(400)
    });
})
