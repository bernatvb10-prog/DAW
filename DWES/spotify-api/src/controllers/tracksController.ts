import { Response } from "express";
import { getAllTracks } from "../Services/trackService";

export function getAllTracksController(res: Response): Response {
    return res.status(200).json(getAllTracks());
}