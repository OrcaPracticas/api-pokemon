import Compression from "compression";
import Cors from "cors";
import Express, { Router, static as Statics } from "express";
import Helmet, { frameguard } from "helmet";
import Path from "path";

import Helpers from "Api/Helpers";
import ServerRouters from "Api/Routers";

// ======================== CONSTANTES ======================== //

const PORT = process.env.PORT || 3000;
const ROOT_PATH = Path.join(__dirname, "./public/");
const Server = Express();

// ==================== COMNFIGURACIONES ==================== //

Server.use(Cors());

Server.use(Helmet());
Server.use(frameguard({ action: "allow-from", domain: "*" }));

Server.use(Compression({ threshold: 0 }));

// ==================== ARCHIVOS STATICOS ==================== //

Server.use("/", Statics(ROOT_PATH, {
    setHeaders(response) {
        Helpers.getTimeToLive(response, 10800, "assets");
    },
}));

// ===================== MANEJO DE RUTAS ====================== //

Server.use(ServerRouters(Router));

// ====================== INICIALIZACION ====================== //

/**
 * Inicializacion del servidor.
 *
 * @param {Number} PORT Puerto por el que estara escuhcando el server.
 * @param {Function} Callback Permite identificar el estado del proceso.
 *
 * return void.
 */
Server.listen(PORT, (error) => {
    Helpers.msg("Iniciando el Servidor", "i");
    if (error) {
        Helpers.msg("Problemas al inicar el servidor", "e");
        console.log(error); // eslint-disable-line
        process.exit(1);
    } else {
        Helpers.msg(`🚀 Servidor listo  en el puerto ${PORT}`, "s");
    }
});
