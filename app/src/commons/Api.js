/* eslint-disable */
import Helpers from "Pokemon/Helpers";
/* eslint-enable */

/**
 * Api para consultar la data de pokemons.
 *
 * @category   Api.
 * @package    App/db.
 */
class Api {
    /**
     * Metodo principal
     *
     * @param {Object} data Listado de los pokemons.
     * @param {String} method (Optional) Nombre del metodo.
     * @param {String} params (Optional) Parametro del metodo a consultar.
     * @param {String} url (Optional) Url de la api.
     *
     * @return  {Object}
     */
    constructor(data, method = "", params = "", url = "") {
        this.db = data;
        this.method = method;
        this.params = params;
        this.url = url;
        return this.action;
    }

    get images() {
        const { db, url } = this;
        const IMAGES = db.map((item) => {
            const NAME = Helpers.formatString(item.name);
            item.img = `${url}/pokemons/${NAME}.jpg`;
            return item;
        });
        return IMAGES;
    }

    /**
     * Permite validar la existencia de uno de sus metodos.
     *
     * @return  {Object}
     */
    get action() {
        const { method, params, url } = this;
        const CALLBACK = this[method] || null;
        const REQUEST = { success: false, data: { msg: `🚨 => El metodo [ ${method} ] no existe` } };
        if (CALLBACK) {
            try {
                REQUEST.success = true;
                const DATA = (typeof CALLBACK === "function")
                    ? CALLBACK(params) : CALLBACK;
                REQUEST.data = DATA.map((item) => {
                    const NAME = Helpers.formatString(item.name);
                    item.img = `${url}/pokemons/${NAME}.jpg`;
                    return item;
                })
            } catch (Notify) {
                REQUEST.data = Notify;
            }
        }
        return REQUEST;
    }

    /**
     * Permite conseguir un pokemon por coincidencias en  el nombre y por nombre conpleto.
     *
     * @return  {[type]}  [return description]
     */
    get name() {
        const { db, params } = this;
        const NAME = Helpers.formatString(params);
        const FILTERS = db.filter((pokemon) => {
            let { name = "" } = pokemon;
            name = Helpers.formatString(name);
            return (name.indexOf(NAME) >= 0);
        });
        return FILTERS;
    }

    /**
     * Consigue de manera aleatorio los datos de un pokemon.
     *
     * @return  {Object}
     */
    get random() {
        const { db } = this;
        const MAX = db.length;
        const IMDEX = Math.floor(Math.random() * (MAX - 0)) + 0;
        return [db[IMDEX]];
    }

    /**
     * Permite conseguir un listado de pokemons por tipo.
     *
     * @return  {Object}
     */
    get type() {
        const { db, params } = this;
        const TYPE = Helpers.formatString(params);
        const FILTERS = db.filter((pokemon) => {
            let { types = [] } = pokemon;
            types = types.toString().toLowerCase();
            types = Helpers.formatString(types);
            return types.includes(TYPE);
        });

        return FILTERS;
    }
}

export default Api;
