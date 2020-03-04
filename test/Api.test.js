/* eslint-disable */
require("@babel/register");
const { expect } = require("chai");
const API = require("../app/src/commons/Api").default;
const Mockup = require("./mockups/pokemons.json");

describe("📝 Testeando la clase Api", () => {
    const domain = "http://dummy.com";

    describe("🧪 Probando el metodo `getImages`", () => {
        it("1 .- Cuando se pasan parametros", () => {
            const Api = new API({ domain });
            const IMAGES = Api.getImages(Mockup);
            expect(IMAGES[0]).to.have.nested.property("name");
            expect(IMAGES.length).to.equal(5);
            expect(IMAGES[0].img).to.equal(`${domain}/pokemons/dumm.jpg`);
        });

        it("2 .- Cunado no se pasan parametros", () => {
            const Api = new API({ domain });
            const IMAGES = Api.getImages();
            expect(IMAGES.length).to.equal(0);
        });
    });

    /* ======================================================= */

    describe("🧪 Probando el metodo `type`", () => {
        const CONFIG = { domain, method: "type", db: Mockup };
        it("1 .- Cuando la busqueda concuerda", () => {
            CONFIG.params = "demon";
            const Api = new API(CONFIG);
            expect(Api).to.have.nested.property("success");
            expect(Api.success).to.be.true;
            expect(Api.data.length).to.have.equal(2);
            expect(Api.data[0].types).to.includes("demon");
        });

        it("2 .- Cuando la busqueda no concuerda", () => {
            CONFIG.params = "noexisto";
            const Api = new API(CONFIG);
            console.log(Api);
            expect(Api).to.have.nested.property("success");
            expect(Api.success).to.be.true;
            expect(Api.data.length).to.have.equal(0);
        });
    });

    /* ======================================================= */

    describe("🧪 Probando el metodo `name`", () => {
        const CONFIG = { domain, method: "name", db: Mockup };
        it("1 .- Cuando la busqueda concuerda con varios nombres", () => {
            CONFIG.params = "men";
            const Api = new API(CONFIG);
            expect(Api).to.have.nested.property("success");
            expect(Api.success).to.be.true;
            expect(Api.data.length).to.have.equal(2);
        });

        it("2 .- Cuando la busqueda no concuerda", () => {
            CONFIG.params = "noexisto";
            const Api = new API(CONFIG);
            expect(Api).to.have.nested.property("success");
            expect(Api.success).to.be.true;
            expect(Api.data.length).to.have.equal(0);
        });
    });

    /* ======================================================= */

    describe("🧪 Probando el metodo `random`", () => {
        const CONFIG = { domain, method: "random", db: Mockup };
        it("1 .- Cuando se genera una busqueda", () => {
            const Api = new API(CONFIG);
            expect(Api).to.have.nested.property("success");
            expect(Api.success).to.be.true;
            expect(Api.data.length).to.have.equal(1);
        });
    });
});