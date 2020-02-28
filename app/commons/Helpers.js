import Colors from "cli-color";

/**
 * Helpers utilidades.
 *
 * @category   Pokeddex
 * @package    App/Helpers.
 */
class Helpers {
    /**
     * Permite el seteo de las metas de cache.
     *
     * @param {express} response Respuesta de express.
     * @param {Number} ttl Tiempo de vida de elemento.
     * @param {String} type Tipo de elemento.
     *
     * @return  {void}
     */
    static getTimeToLive(response, ttl = 100, type = "generic") {
        const EDGE_VALUE = `POKEMON_${type}`.toUpperCase();
        response.setHeader("Edge-Control", `!no-store, cache-maxage=${ttl}s`);
        response.setHeader("Edge-Cache-Tag", EDGE_VALUE);
        response.setHeader("Cache-Control", `max-age=${ttl}`);
    }

    /**
     * Permite el envio de mensajes
     *
     * @param  String text Mensaje que se desea mostrar.
     * @param  String type (Optional) Tipo de mensaje
     *
     * e = error
     * s = succses
     * w = warning
     * default = info
     *
     * @return void.
     */
    static msg(text, type = "") {
        let log = "";
        let msg = "";
        const lon = (text.length < 90) ? (100 - text.length) : 0;
        switch (type) {
        case "e":
            log = Colors.xterm(15).bgXterm(124).bold;
            msg = "🛑 ERROR   ";
            break;
        case "s":
            log = Colors.xterm(15).bgXterm(34).bold;
            msg = "✅ SUCCESS ";
            break;
        case "w":
            log = Colors.xterm(232).bgXterm(214).bold;
            msg = "⚠️ WARNING ";
            break;
        default:
            log = Colors.xterm(15).bgXterm(12).bold;
            msg = "ℹ️ INFO    ";
            break;
        }
        for (let i = 0; i < lon; i += 1) { text += " "; }
        console.log(log(` [${msg}] => ${text}`)); // eslint-disable-line
    }
}

export default Helpers;
