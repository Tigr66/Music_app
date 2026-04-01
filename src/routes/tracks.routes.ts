import { Router } from "express";

export class TracksRoutes {
    public router: Router;
    // private linksController: LinksController;

    constructor() {
        // this.linksController = new LinksController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post("/");
        this.router.get("/");
    }
}
