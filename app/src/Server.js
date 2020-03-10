import Compression from "compression";
import Cors from "cors";
import Express, { Router, static as Statics } from "express";
import Helmet, { frameguard } from "helmet";
import Path from "path";

/* eslint-disable */
import Api from "Pokemon/Api";
import ApiDB from "ApiDB";
import Helpers from "Pokemon/Helpers";
import ServerRouters from "Pokemon/Routers";
/* eslint-enable */

// ======================== CONSTANTES ======================== //

const ENV = process.env.NODE_ENV || "production";
const APP_PORT = process.env.PORT || 3000;
const ROOT_PATH = Path.join(__dirname, "../");

const Server = Express();
// ==================== COMNFIGURACIONES ==================== //

Server.use(Cors());

Server.use(Helmet());
Server.use(frameguard({ action: "allow-from", domain: "*" }));

Server.use(Compression({ threshold: 0 }));

// ==================== ARCHIVOS STATICOS ==================== //

Server.use("/", Statics(`${ROOT_PATH}/public/`, {
    setHeaders(response) {
        Helpers.getTimeToLive(response, 10800, "assets");
    },
}));


// ===================== MANEJO DE RUTAS ====================== //

// Utilizando el middeleware para cargar la DB(Json).
Server.use((request, response, next) => {
    const { originalUrl, protocol, hostname } = request;
    const URL = `${protocol}://${hostname}${ENV !== "production" ? `:${APP_PORT}` : ""}`;
    const CONFIG = { domain: process.env.MONGO};
    const API = new Api(CONFIG);
    Helpers.msg(`Solicitando ${URL}${originalUrl}`, "i");
    request.db = API.getImages(ApiDB);
    request.URL = `${URL}`;
    next();
});

// Cargando las rutas que estaran disponibles
Server.use(ServerRouters(Router, Helpers));

// ====================== INICIALIZACION ====================== //

/**
 * Inicializacion del servidor.
 *
 * @param {Number} PORT Puerto por el que estara escuhcando el server.
 * @param {Function} Callback Permite identificar el estado del proceso.
 *
 * return void.
 */
Server.listen(APP_PORT, (error) => {
    Helpers.msg("Iniciando el Servidor", "i");
    if (error) {
        Helpers.msg("Problemas al inicar el servidor", "e");
        console.log(error); // eslint-disable-line
        process.exit(1);
    } else {
        Helpers.msg(`🚀 Servidor listo  en el puerto ${APP_PORT}`, "s");
    }
});

export default Server;
