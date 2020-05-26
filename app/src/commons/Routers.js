/* eslint-disable */
import Api from "Pokemon/Api";
import MongoApi from "Pokemon/MongoApi";
/* eslint-enable */

const ServerRouter = (router, helpers) => {
    const Router = router();

    // Consultando los metodos del Api(JSON).
    Router.use("/api/:method?/:params?", (request, response) => {
        const { db, params: { method = "find", params = "" } } = request;
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
    Router.use("/:method?/:args?", (request, response) => {
        const { params: { args = {}, method = "find" }, URL } = request;
        const { msg, getTimeToLive } = helpers;
        helpers.msg(`Lanzando el metodo ${method}`, "i");
        const PARAMS = {
            args,
            domain: URL,
            method,
            response,
            helpers: {
                getTimeToLive,
                msg,
            },
        };
        const API = new MongoApi(PARAMS);
    });
    return Router;
};

export default ServerRouter;
