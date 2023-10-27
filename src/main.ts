import express from "express";
import mongoose from "mongoose";
import { load } from "load";

import { getAllCharacters, getCharacter } from "./resolvers.ts/get.ts";
import { deleteCharacter } from "./resolvers.ts/delete.ts";
import { updateCharacter } from "./resolvers.ts/put.ts";
import { createCharacter } from "./resolvers.ts/post.ts";

const env = await load();

const mongo_usr: string = env["MONGO_USR"];
const mongo_pwd: string = env["MONGO_PWD"];
const mongo_uri: string = env["MONGO_URI"];
const db_name: string = env["DB_NAME"];

if (!mongo_usr || !mongo_pwd || !mongo_uri || !db_name) {
  console.log("Missing env values");
  Deno.exit(1);
}

await mongoose.connect(`mongodb+srv://${mongo_usr}:${mongo_pwd}@${mongo_uri}/${db_name}?retryWrites=true&w=majority`);

const miapp = express();
miapp.use(express.json());

miapp
  .get("/api/tierramedia/personajes", getAllCharacters)
  .get("/api/tierramedia/personajes/:id", getCharacter)
  .post("/api/tierramedia/personajes", createCharacter)
  .put("/api/tierramedia/personajes/:id", updateCharacter)
  .delete("/api/tierramedia/personsajes/:id", deleteCharacter);

miapp.listen(3000, (): void => {
  console.log("Sever ready on: http://localhost:3000/");
});