import fs, {createWriteStream } from 'fs';
import morgan from "morgan";
import path from 'path';
import moment from 'moment-timezone';

export const morganLog = () => {
    // ! Definimos el PATH de la ruta del log
    const logFilePath = path.join(process.cwd(), 'access.log');
    // * Creamos un stream para escribir en nuestro archivo
    const accessLogStream = createWriteStream(logFilePath, { flags: 'a' });
    // ? Definimos el formato del router
    const loggerFormat = '[:date[clf]] :method :url :status :response-time ms - :res[content-length]';

    morgan.token('date', (req, res, tz) => {
        return moment().tz('America/Bogota').format('DD/MM/YYYY HH:mm:ss');
    });

    return {
        accessLogStream,
        loggerFormat
    }
}