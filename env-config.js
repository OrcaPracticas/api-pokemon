const USER = process.env.ADMIM || "pokemon";
const PASS = process.env.PASS || "p0k3m0n.";
const DB = process.env.DB || "api";

module.exports = {
    "process.env.MONGO": `mongodb+srv://${USER}:${PASS}@cluster0-u55vg.mongodb.net/${DB}?retryWrites=true&w=majority`,
};
