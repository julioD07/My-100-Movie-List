import express from "express";
import cors from 'cors'
import router from "../routers/router.js";
import morgan from "morgan";

import { morganLog } from "../middlewares/morgan-log.js";
import { dbConnection } from "../database/config.js";

class Server {

    constructor() {
        // ! Configuarciones Iniciales Servidor
        this.app = express()
        this.port = process.env.PORT || 3000

        // ! Definimos los string rutas
        this.authPath = '/api'

        // ! Conectar a base de datos
        this.conectarDB()

        // ! Middlewares
        this.midleware()

        // ! Rutas de mi aplicacion
        this.routes()
    }

    async conectarDB() {
        await dbConnection()
    }

    midleware() {
        // ! CORS
        this.app.use(cors())

        // ! Lectura y parseo del body
        this.app.use(express.json())

        // ! Directorio publico
        this.app.use(express.static('public'))

        // ! Invocamos morgan junto con un log
        const { loggerFormat, accessLogStream } = morganLog()
        this.app.use(morgan(loggerFormat, { stream: accessLogStream }));
        this.app.use(morgan(loggerFormat)); // Esto es para que se muestre por consola)
    }

    routes() {
        // ! Llamamos la ruta principal /api donde heredaran las demas
        this.app.use(this.authPath, router)
        // this.app.use(this.usuariosPath, require('../routes/usuarios.routes'))
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el http://localhost:${this.port}/`)
        })
    }

    obtenerApp() {
        const app = this.app
        return app
    }
}

export default Server