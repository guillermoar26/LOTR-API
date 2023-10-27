import { CharacterModel } from "../db/characters.ts"
import { Request, Response } from "express";

export const updateCharacter = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            req.status(400).send("No id given");
            return;
        }

        const { name, race, description, abilities } = req.body;
        if (!name || !race || !description || !abilities) {
            res.status(400).send("Missing required values");
            return;
        }

        const validRaces: string[] = ["Hobbits", "Humanos", "Elfos", "Enanos", "Ents"];
        if (!validRaces.includes(abilities)) {
            res.status(500).send("Wrong hability!");
            return;
        }

        const updateCharacter = await CharacterModel.findOneAndUpdate(
            { id },
            { name, race, description, abilities },
            { new: true }
        ).exec();

        if (!updateCharacter) {
            res.status(404).send("Unable to update character");
            return;
        }

        res.status(200).send({
            name: updateCharacter.name,
            race: updateCharacter.race,
            description: updateCharacter.description,
            abilities: updateCharacter.abilities,
            id: updateCharacter._id.toString(),
        });
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
};