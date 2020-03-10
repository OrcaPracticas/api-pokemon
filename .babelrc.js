const env = require("./env-config");

module.exports = {
    presets: [
        "@babel/preset-env",
        "minify"
    ],
    plugins: [
        "inline-json-import",
        [
            "module-resolver",
            {
                alias: {
                    Pokemon: "./app/src/commons/",
                    ApiDB: "./app/db/DataBase.json",
                },
            },
        ],
        [
            "transform-define",
            { ...env },
        ]
    ],
}