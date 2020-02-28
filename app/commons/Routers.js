import { response } from "express";

const ServerRouter = (router) => {
    const Router = router();

    Router.use("/", (request, response) => {
        response.status(200);
        response.send("<h1>HOLA</h1>");
    });

    return Router;
};

export default ServerRouter;