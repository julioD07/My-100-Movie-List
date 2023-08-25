import express from "express";
import cors from 'cors'
import router from "../routers/router.js";

class Server {

    constructor() {
        // ! Configuarciones Iniciales Servidor
        this.app = express()
        this.port = process.env.PORT || 3000

        // ! Definimos los string rutas
        this.authPath = '/api'

        // ! Middlewares
        this.midleware()

        // ! Rutas de mi aplicacion
        this.routes()
    }

    midleware() {
        // ! CORS
        this.app.use(cors())

        // ! Lectura y parseo del body
        this.app.use(express.json())

        // ! Directorio publico
        this.app.use(express.static('public'))
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
}

export default Server