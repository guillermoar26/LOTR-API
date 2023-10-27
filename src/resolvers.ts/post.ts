import { CharacterModel } from "../db/characters.ts"
import { Request, Response } from "express";

export const createCharacter = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, race, description, abilities } = req.body;
        if (!name || !race || !description || !abilities) {
            res.status(400).send("Missing required values");
            return;
        }

        const validRaces: string[] = ["Hobbits", "Humanos", "Elfos", "Enanos", "Ents"];
        if (!validRaces.includes(race)) {
            res.status(500).send("Wrong race!");
            return;
        }

        if (abilities.length === 0) {
            res.status(500).send("There are no abilities");
            return;
        }

        const createdCharacter = await CharacterModel.create({
            id: Math.floor(Math.random() * 1000),
            name,
            race,
            description,
            abilities,
        });

        if (!createdCharacter) {
            res.status(404).send("Unable to create character, try again");
            return;
        }

        res.status(200).send("Chracter created successfully!!!!");
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
};