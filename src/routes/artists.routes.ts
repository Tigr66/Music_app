import { Router } from "express";
import { uploadArtistImage } from "../middlewares/upload.middleware";

export class ArtistsRoutes {
    public router: Router;
    // private linksController: LinksController;

    constructor() {
        // this.linksController = new LinksController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post("/", uploadArtistImage.single("image"));
        this.router.get("/");
    }
}
