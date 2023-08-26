<!-- my-100-movie-list -->
# Proyecto API My 100 Movie List

## Descripción
Este proyecto consiste en desarrollar una REST API de una red social en la cual los amantes del cine compartan los títulos de películas que más les gustan, el propósito es poder compartir y calificar sus preferencias con el fin de
enriquecer mutuamente su lista de películas.

## Tecnologías
- Node.js
- Express.js
- MongoDB
- JWT para autenticación
- Mongoose para modelado y acceso a la base de datos
- Jest para pruebas unitarias

## Instalación y Ejecución
1. Clona este repositorio.
2. Instala las dependencias usando `npm install`.
3. Configura las variables de entorno, como la conexión a la base de datos y la clave secreta JWT.
4. Ejecuta `npm start` para iniciar el servidor.

## Endpoints API My 100 Movie List

### Crear un nuevo usuario

- **Descripción**: Crea un nuevo usuario en la base de datos.
- **URL**: `/api/usuario/registrar`
- **Método**: POST
- **Cuerpo de la solicitud**:
```json
  {
    "username": "ejemploUsuario",
    "corre": "correo@example.com",
    "password": "contraseña",
    "nombre": "examplename"
  }
```
#### Respuesta Exitosa (Código: 201)
- **Código**: 201 (Creado).
- **Cuerpo de la Respuesta**:
```json
{
  "ok": true,
  "msg": "Usuario Registrado Correctamente",
  "usuario": {
    "username": "ejemploUsuario",
    "nombre": "examplename",
    "correo": "correo@example.com",
    "estado": true,
    "peliculas": [],
    "fechaCreacion": "2023-08-26T23:02:35.024Z",
    "uid": "64ea848bbcddf43d69c30db1"
  }
}
```