import { model as Model, Schema } from "mongoose";

// Creando el schema con los datos correspondiente a los pokemons
const SCHEMA = new Schema({
    pid: Number,
    abilities: [String],
    evolution: [String],
    height: String,
    id: String,
    name: { type: String, required: true },
    species: String,
    stats: {
        attack: Number,
        defense: Number,
        hp: Number,
        sp: {
            atk: Number,
            def: Number,
        },
        speed: Number,
        total: Number,
    },
    types: [String],
    weight: String,
    img: String,
});

// Exportamos el modelo
export default Model("pokemon", SCHEMA);
