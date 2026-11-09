import { Router } from "express";
import { deletePlaylistController, getAllPlaylistsController, getPlaylistByIdController, getPlaylistTracksController, postPlaylistController, putPlaylistController } from "../controllers/playlistController";

export const playlistRouter: Router = Router();

playlistRouter.get("/", getAllPlaylistsController);
playlistRouter.get("/:id/tracks", getPlaylistTracksController);
playlistRouter.get("/:id", getPlaylistByIdController);
playlistRouter.post("/", postPlaylistController);
playlistRouter.put("/:id", putPlaylistController);
playlistRouter.delete("/:id", deletePlaylistController);
