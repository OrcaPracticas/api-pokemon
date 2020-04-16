/* eslint-disable */
import Api from "Pokemon/Api";
import MongoApi from "Pokemon/MongoApi";
/* eslint-enable */


const ServerRouter = (router, helpers) => {
    const Router = router();

    // Consultando los metodos del Api(JSON).
    Router.use("/api/:method?/:params?", (request, response) => {
        const { db, params: { method = "", params = "" } } = request;
        const CONFIG = {
            db,
            method,
            params,
        };
        const { success, data } = new Api(CONFIG);
        let status = 404;
        let type = "e";
        let msg = data;
        if (success) {
            status = 200;
            type = "s";
            msg = "OK !";
        }
        helpers.getTimeToLive(response, 10800, `API_${method}`);
        helpers.msg(`Lanzando el metodo ${method}`, "i");
        helpers.msg(msg, type);
        response.status(status);
        response.send(data);
    });

    // Consultando los metodos del Api(MongoDB)
    Router.use("/db/:method?/:args?", (request, response) => {
        const { params: { args = {}, method = "find" }, URL } = request;
        helpers.getTimeToLive(response, 10800, `DB_${method}`);
        helpers.msg(`Lanzando el metodo ${method}`, "i");
        const PARAMS = {
            args,
            domain: URL,
            method,
            response,
            msg: helpers.msg,
        };
        const API = new MongoApi(PARAMS);
    });


    // Pagina principal
    Router.use((request, response) => {
        const { db, originalUrl } = request;
        let status = 404;
        let type = "e";
        let tag = "API_ERROR";
        let data = { success: false, msg: "🚨 Not found 404" };

        if (originalUrl === "/") {
            status = 200;
            type = "s";
            tag = "API_ALL";
            data = db;
        }

        helpers.getTimeToLive(response, 10800, tag);
        helpers.msg("Respuesta recibida", type);
        response.status(status);
        response.json(data);
    });

    return Router;
};

export default ServerRouter;
