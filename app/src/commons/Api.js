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
     * @param {String} domain (Optional) Url de la api.
     * @param {String} method (Optional) Nombre del metodo.
     * @param {String} params (Optional) Parametro del metodo a consultar.
     *
     * @return  {Object}
     */
    constructor({ db = [], domain = "", method = "", params = "" }) {
        this.db = db;
        this.domain = domain;
        this.method = method;
        this.params = params;
        return (method) ? this.action : this;
    }

    /**
     * Permite conseguir las imagenes
     *
     * @param {Array} db Listado de pokemons.
     *
     * @return  {Array}
     */
    getImages(db = []) {
        const { domain } = this;
        const IMAGES = db.map((item = {}) => {
            const { name = "" } = item;
            if (name) {
                const NAME = Helpers.formatString(name);
                item.img = `${domain}/pokemons/${NAME}.jpg`;
            }
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
        const { method, params } = this;
        const CALLBACK = this[method] || null;
        const REQUEST = { success: false, data: { msg: `🚨 => El metodo [ ${method} ] no existe` } };
        if (CALLBACK) {
            try {
                REQUEST.success = true;
                const DATA = (typeof CALLBACK === "function")
                    ? CALLBACK(params) : CALLBACK;
                REQUEST.data = DATA;
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
