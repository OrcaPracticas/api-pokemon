/* eslint-disable */
import PokemonModel from "Pokemon/Schema";
/* eslint-enable */

class MongoApi {
    constructor({ args, domain, method, response, msg }) {
        this.domain = domain;
        this.method = method;
        this.params = args;
        this.msg = msg;
        this.response = response;
        this.find = this.find.bind(this);
        return (method !== "") ? this.action : this;
    }

    /**
     * Permite validar la existencia de uno de sus metodos.
     *
     * @return  {Boolean}
     */
    get action() {
        const { method, params } = this;
        const CALLBACK = this[method] || null;
        const REQUEST = { success: false, data: { msg: `🚨 => El metodo [ ${method} ] no existe` } };
        if (CALLBACK) {
            try {
                if (typeof CALLBACK === "function") {
                    CALLBACK(params);
                } else { CALLBACK; }
            } catch (Notify) {
                REQUEST.data = Notify;
            }
        } else {
            this.sendResult(REQUEST);
        }
        return true;
    }

    /**
     * Permite realizar busqueds dentro de Mongo.
     *
     * @param {Object} query Query para realizar la busqueda.
     *
     * @return {void}
     */
    find(query = {}) {
        const { domain = "1" } = this;
        PokemonModel.find(query, (error, data) => {
            let list = data || [];
            let findError = error || null;
            if (list.length > 0) {
                list = list.map((item) => {
                    const { img } = item;
                    item.img = `${domain}${img}`;
                    return item;
                });
            } else {
                findError = { msg: "🚨 => La busqueda no genero resultados", query };
            }
            this.sendResult(findError, list);
        });
    }

    /**
     * Permite conseguir un pokemon por coincidencias en  el nombre y por nombre conpleto.
     *
     * @return  {Boolean}
     */
    get name() {
        const { params } = this;
        const REG_EXP = new RegExp(params, "i");
        const QUERY = { name: { $in: [REG_EXP] } };
        this.find(QUERY);
        return true;
    }

    /**
     * Consigue de manera aleatorio los datos de un pokemon.
     *
     * @return  {Boolean}.
     */
    get random() {
        PokemonModel.countDocuments((error, total) => {
            if (error) this.sendResult(error);
            const pid = Math.floor(Math.random() * (total - 0)) + 0;
            this.find({ pid });
        });
        return true;
    }

    /**
     * Maneja todas las opciones de salida.
     *
     * @param {Object} error Descripcion del error.
     * @param {Object} data Resultado de la busqueda
     *
     * @return {Void}.
     */
    sendResult(error, data) {
        const { response } = this;
        const STATUS = error ? 404 : 200;
        const SEND = error || data;
        const ACTION = (typeof SEND === "object") ? "json" : "send";
        if (STATUS === 200) {
            this.msg("OK !", "s");
        } else {
            this.msg(SEND, "e");
        }
        response.status(STATUS);
        response[ACTION](SEND);
    }

    /**
     * Permite conseguir un listado de pokemons por tipo.
     *
     * @return {Booelan}
     */
    get type() {
        const { params } = this;
        const REG_EXP = new RegExp(params, "i");
        const QUERY = { types: { $in: [REG_EXP] } };
        this.find(QUERY);
        return true;
    }
}

export default MongoApi;
