/* eslint-disable no-restricted-syntax */
import Colors from "cli-color";

/**
 * Helpers utilidades.
 *
 * @category   Pokeddex
 * @package    App/Helpers.
 */
class Helpers {
    /**
     * Permite limpiar y formatear una cadena
     *
     * @param {string} string Cadena a limpiar.
     * @param {string} union Cararter con el que sera unida.
     *
     * @retur {string}
     */
    static formatString(string = "", union = "") {
        let ascii = 0;
        let char = "";
        let newString = "";
        const STRING = string.toLowerCase();
        const SPECIAL = {
            á: "a",
            é: "e",
            í: "i",
            ó: "o",
            ú: "u",
            ñ: "n",
            "♀": "f",
            "♂": "m",
        };

        for (let i = 0; i < STRING.length; i += 1) {
            char = STRING[i];
            char = (typeof SPECIAL[char] !== "undefined") ? SPECIAL[char] : char;
            if (typeof char !== "function") {
                ascii = char.charCodeAt();
                newString += (ascii === 32 || (ascii >= 48 && ascii <= 57) || (ascii >= 97 && ascii <= 122)) ? char : "";
            }
        }
        newString = newString.split(" ").filter(Boolean);
        return newString.join(union);
    }

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
        let auxText = typeof text === "object" ? JSON.stringify(text) : text;
        const lon = (auxText.length < 90) ? (100 - auxText.length) : 0;
        switch (type) {
        case "e":
            log = Colors.xterm(15).bgXterm(124).bold;
            msg = " 🚨  ERROR    ";
            break;
        case "s":
            log = Colors.xterm(15).bgXterm(34).bold;
            msg = " 🙌  SUCCESS  ";
            break;
        case "w":
            log = Colors.xterm(232).bgXterm(214).bold;
            msg = " ⚠️  WARNING ";
            break;
        default:
            log = Colors.xterm(15).bgXterm(12).bold;
            msg = " ℹ️  INFO     ";
            break;
        }
        for (let i = 0; i < lon; i += 1) { auxText += " "; }
        console.log(log(` [${msg}] => ${auxText}`)); // eslint-disable-line
    }
}

export default Helpers;
