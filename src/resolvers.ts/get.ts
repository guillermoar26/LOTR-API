import { CharacterModel } from "../db/characters.ts"
import { Request, Response } from "express";

export const getCharacter = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Invalid id format");
            return;
        }

        const exists = await CharacterModel.findOne({ id: id }).exec();
        if (!exists) {
            res.status(404).send("unable to find character");
            return;
        }

        res.status(200).send({
            id: exists.id,
            name: exists.name,
            race: exists.race,
            description: exists.description,
            abilities: exists.abilities
        });
    } catch {
        res.status(500).send("Error getting specified character");
        return;
    }
}

export const getAllCharacters = async (res: Response): Promise<void> => {
    try {
        if (CharacterModel.length === 0) {
            res.status(400).send("No characters in database");
        }

        const characters = await CharacterModel.find().exec();
        res.status(200).send(characters);
    } catch {
        res.status(500).send("Error fetching all characters");
        return;
    }
};

