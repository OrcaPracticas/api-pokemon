/* eslint-disable */
require("@babel/register");
const Chai = require("chai");
const ChaiHttp = require("chai-http");
process.env.PORT = 8080;

const Server = require("../app/src/Server").default;
const { expect } = Chai;

Chai.use(ChaiHttp);
Chai.should();

describe("📋 Testeando el servidor", () => {
    describe("🧪 Probando el raouter '/'", () => {
        it("1 .- Se tienen que listar todos los pokemons", (done) => {
            Chai
                .request(Server)
                .get("/")
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("Array");
                    expect(response).to.have.header("Edge-Cache-Tag", "POKEMON_API_ALL");
                    done();
                });
        });
    });

    describe("🧪 Probandp el router '/api/'", () => {
        it("1 .- Probando el router '/random'", (done) => {
            Chai
                .request(Server)
                .get("/api/random")
                .end((error, response) => {
                    const { body } = response;
                    response.should.have.status(200);
                    response.body.should.be.a("Array");
                    expect(body[0]).to.have.nested.property("name");
                    expect(response).to.have.header("Edge-Cache-Tag", "POKEMON_API_RANDOM");
                    done();
                });
        });

        it("2 .- Probando el router '/type/fire' (el tipo de pokemon existe)", (done) => {
            Chai
                .request(Server)
                .get("/api/type/fire")
                .end((error, response) => {
                    const { body } = response;
                    response.should.have.status(200);
                    response.body.should.be.a("Array");
                    expect(body.length).to.be.equal(12);
                    expect(response).to.have.header("Edge-Cache-Tag", "POKEMON_API_TYPE");
                    done();
                });
        });

        it("3 .- Probando el router '/type/noexisto' (el tipo de pokemon no existe)", (done) => {
            Chai
                .request(Server)
                .get("/api/type/dummy")
                .end((error, response) => {
                    const { body } = response;
                    response.should.have.status(200);
                    response.body.should.be.a("Array");
                    expect(body.length).to.be.equal(0);
                    expect(response).to.have.header("Edge-Cache-Tag", "POKEMON_API_TYPE");
                    done();
                });
        });

        it("4 .- Probando el router '/name/char' (El nombre tiene incidencia)", (done) => {
            Chai
                .request(Server)
                .get("/api/name/cha")
                .end((error, response) => {
                    const { body } = response;
                    response.should.have.status(200);
                    response.body.should.be.a("Array");
                    expect(body.length).to.be.equal(6);
                    expect(response).to.have.header("Edge-Cache-Tag", "POKEMON_API_NAME");
                    done();
                });
        });

        it("5 .- Probando el router '/name/dummy' (El nombre no tiene incidencia)", (done) => {
            Chai
                .request(Server)
                .get("/api/name/dummy")
                .end((error, response) => {
                    const { body } = response;
                    response.should.have.status(200);
                    response.body.should.be.a("Array");
                    expect(body.length).to.be.equal(0);
                    expect(response).to.have.header("Edge-Cache-Tag", "POKEMON_API_NAME");
                    done();
                });
        });

        it("6 .- Probando el router '/dummy/char' (El metodo no existe)", (done) => {
            Chai
                .request(Server)
                .get("/api/dummy/char")
                .end((error, response) => {
                    const { body } = response;
                    response.should.have.status(404);
                    expect(response).to.have.header("Edge-Cache-Tag", "POKEMON_API_DUMMY");
                    expect(response).to.be.json;
                    done();
                });
        });
    });

    describe("🧪 Probando el un router no valido ", () => {
        it("1 .- Se tienen que mostrar un mensaje de error", (done) => {
            Chai
                .request(Server)
                .get("/demo")
                .end((error, response) => {
                    const { body } = response;
                    response.should.have.status(404);
                    expect(response).to.be.json;
                    expect(body).to.have.nested.property("success");
                    expect(response).to.have.header("Edge-Cache-Tag", "POKEMON_API_ERROR");
                    done();
                });
        });
    });
});
