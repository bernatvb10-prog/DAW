import { Response, Request } from "express";
import { createTrack, getAllTracks, getTrackById } from "../Services/trackService";
import { TrackBD } from "../interfaces/track/trackBD";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { ErrorService } from "../interfaces/error/errorService";
import { tracks } from "../data/track/track";

export function getAllTracksController(res: Response): Response {
    return res.status(200).json(getAllTracks());
}

export function getTrackByIdController(req: Request, res: Response): Response {
    const track: TrackBD | undefined = getTrackById(req.params.id as string);

    if (!track) {
        return res.status(404).json({ message: `Track not found` });
    }
    return res.status(200).json(track);

}

export function postTrackController(req: Request, res: Response): Response {
    const result: CreateSuccessService<TrackBD> | ErrorService = createTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }


    tracks.push((result as CreateSuccessService<TrackBD>).data);
    return res.status(result.code).json(result);

}

