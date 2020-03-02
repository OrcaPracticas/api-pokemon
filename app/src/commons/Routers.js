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
        helpers.getTimeToLive(response, 10800, "API_ALL");
        helpers.msg("Respuesta recibida", "s");
        response.status(200);
        response.json(request.DB);
    });

    return Router;
};

export default ServerRouter;
