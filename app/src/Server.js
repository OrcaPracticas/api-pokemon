import BrowserSync from "browser-sync";
import Compression from "compression";
import Cors from "cors";
import Express, { Router, static as Statics } from "express";
import Helmet, { frameguard } from "helmet";
import Path from "path";

/* eslint-disable */
import Helpers from "Api/Helpers";
import ServerRouters from "Api/Routers";
/* eslint-enable */

// ======================== CONSTANTES ======================== //

const ENV = process.env.NODE_ENV || "production";
const PORT = process.env.PORT || 3000;
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
        if (ENV === "develop") {
            Helpers.msg("🔄 BrowserSync Activado", "w");
            BrowserSync({
                files: [
                    `${ROOT_PATH}/app/**/*.{js,ico,png}`,
                ],
                online: true,
                open: true,
                port: PORT + 1,
                proxy: `localhost:${PORT}`,
                ui: false,
            });
        }
        Helpers.msg(`🚀 Servidor listo  en el puerto ${PORT}`, "s");
    }
});
