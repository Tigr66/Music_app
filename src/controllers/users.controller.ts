import { Request, Response } from "express";
import { TracksService } from "../services/tracks.service";

export class TracksController {
    private usersService: TracksService;

    constructor() {
        this.usersService = new TracksService();
    }

    createUser = async (req: Request, res: Response) => {
        try {
        } catch {
            res.status(500).json({ error: "Creating user failed" });
        }
    };

    loginUser = async (req: Request, res: Response) => {
        try {
        } catch {
            res.status(500).json({ error: "Login user failed" });
        }
    };
}
