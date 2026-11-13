import { Router } from "express";
import { deleteTrackController, getAllTracksController, getTrackByIdController, getTrackLikesController, postTrackController, postTrackUserHistoryController, postTrackUserLikeController, updateTrackController } from "../controllers/tracksController";

export const trackRouter: Router = Router();

trackRouter.get("/", getAllTracksController);
trackRouter.get("/:id/likes", getTrackLikesController);
trackRouter.get("/:id", getTrackByIdController);
trackRouter.post("/", postTrackController);
trackRouter.put("/:id", updateTrackController);
trackRouter.delete("/:id", deleteTrackController);

trackRouter.post("/user/history", postTrackUserHistoryController);
trackRouter.post("/user/likes", postTrackUserLikeController);