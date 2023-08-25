import Server from './www/server.js'
import dotenv from 'dotenv';

// ! Llamamos el metodo de dotenv
dotenv.config();

const server = new Server()

// ! Colocamos el servidor a arrancar
server.listen()