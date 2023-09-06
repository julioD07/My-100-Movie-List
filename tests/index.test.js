import supertest from "supertest";
import mongoose from "mongoose";
import Server from "../www/server.js";
import dotenv from 'dotenv';
import { usuarioInvalido, usuarioValido } from "./data/data.js";

// ! Llamamos el metodo de dotenv
dotenv.config();

let app = new Server().obtenerApp();


describe('Pruebas unitarias Rest Service Funcionando', () => {
    // Ahora puedes escribir tus pruebas utilizando 'app' y 'supertest'
    test('Test de Rest Service Funcionando', async () => {
        const response = await supertest(app)
            .get('/')
            // TODO Esperamos que el status sea 200
        expect(response.status).toBe(200)
    });

})
