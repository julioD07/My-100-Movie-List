import express from "express";
import cors from 'cors'

class Server {

    constructor() {
        // ! Configuarciones Iniciales Servidor
        this.app = express()
        this.port = process.env.PORT || 3000

        // ! Definimos los string rutas
        this.authPath = '/api/auth'


    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el http://localhost:${this.port}/`)
        })
    }
}

export default Server