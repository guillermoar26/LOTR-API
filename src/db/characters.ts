import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    id: { type: Number, require: true },
    name: { type: String, require: true },
    race: { type: String, require: true },
    description: { type: String, require: true },
    abilities: { type: [String], require: true },
});

export type CharacterModelType = {
    id: number,
    name: string,
    race: string,
    description: string,
    abilities: string[],
};

export const CharacterModel = mongoose.model<CharacterModelType>("Characters", CharacterSchema);