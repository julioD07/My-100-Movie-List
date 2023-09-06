import supertest from "supertest";
import mongoose from "mongoose";
import Server from "../../www/server.js";
import dotenv from 'dotenv';
import { usuarioInvalido, usuarioRegistrar, usuarioRegistrarInvalido, usuarioValido } from "../data/data.js";

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


describe('Pruebas unitarias de Registro Usuario', () => {
    test('Registro de Usuario Valido', async () => {
      // Realiza una solicitud de registro con datos válidos
      const response = await supertest(app)
        .post('/api/usuario/registrar')
        .send(usuarioRegistrar);
  
      // Realiza aserciones sobre la respuesta
      expect(response.status).toBe(201);
      // Otras aserciones...
    });
  
    test('Registro de Usuario Invalido', async () => {
      // Realiza una solicitud de registro con datos inválidos
      const response = await supertest(app)
        .post('/api/usuario/registrar')
        .send(usuarioRegistrar);
  
      // Realiza aserciones sobre la respuesta
      expect(response.status).toBe(400);
    
      // Otras aserciones...
    });
  
    // Otras pruebas de registro...
  });