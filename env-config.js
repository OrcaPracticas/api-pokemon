const USER = process.env.ADMIN || "pokemon";
const PASS = process.env.PASS || "p0k3m0n.";
const DB = process.env.DB || "api";
const CLUSTER = "@cluster0-eke4y.mongodb.net";
module.exports = {
    "process.env.MONGO": `mongodb+srv://${USER}:${PASS}${CLUSTER}/${DB}?retryWrites=true&w=majority`,
    "procces.env.DOMAIN": process.env.DOMAIN || "",
    "process.env.CONFIG": {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};
