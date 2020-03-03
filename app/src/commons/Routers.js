/* eslint-disable */
import Api from "Pokemon/Api";
/* eslint-enable */


const ServerRouter = (router, helpers) => {
    const Router = router();

    // Consultando los metodos del Api.
    Router.use("/api/:method?/:param?", (request, response) => {
        const { DB, params: { method = "", param = "" }, URL } = request;
        const { success, data } = new Api(DB, method, param, URL);
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

    // Pagina principal
    Router.use((request, response) => {
        const { originalUrl } = request;
        let status = 404;
        let type = "e";
        let tag = "API_ERROR";
        let data = { success: false, msg: "🚨 Not found 404" };

        if (originalUrl === "/") {
            status = 200;
            type = "2";
            tag = "API_ALL";
            data = request.DB;
        }

        helpers.getTimeToLive(response, 10800, tag);
        helpers.msg("Respuesta recibida", type);
        response.status(status);
        response.json(data);
    });

    return Router;
};

export default ServerRouter;
