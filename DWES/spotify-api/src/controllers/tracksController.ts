import { Response, Request } from "express";
import { createTrack, deleteTrack, getAllTracks, getTrackById, updateTrack } from "../Services/trackService";
import { TrackBD } from "../interfaces/track/trackBD";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { ErrorService } from "../interfaces/error/errorService";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { SelectSuccessService } from "../interfaces/error/selectSuccessService";
import { addTrackUserHistory } from "../Services/historyService";
import { addTrackUserLike, getTrackLikeSummary, getTrackLikeTotal } from "../Services/likeService";
import { Like } from "../interfaces/like/like";
import { TrackLikeSummary } from "../interfaces/like/trackLikeSummary";

export async function getAllTracksController(_req: Request, res: Response): Promise<Response> {
    const tracks: TrackBD[] = await getAllTracks();
    return res.status(200).json(tracks);
}

export async function getTrackByIdController(req: Request, res: Response): Promise<Response> {
    const result: SelectSuccessService<TrackBD> | ErrorService = await getTrackById(req.params.id as string);

    if (!result.success) {
        return res.status(result.code).json({ message: (result as ErrorService).message });
    }
    return res.status(result.code).json(result);

}

export async function postTrackController(req: Request, res: Response): Promise<Response> {
    const result: CreateSuccessService | ErrorService = await createTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }


    return res.status(result.code).json(result);

}


export async function updateTrackController(req: Request, res: Response): Promise<Response> {
    const result: UpdateSuccessService<number> | ErrorService = await updateTrack(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}

export async function deleteTrackController(req: Request, res: Response): Promise<Response> {
    const result: DeleteSuccessService | ErrorService = await deleteTrack(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).send();
}


export async function postTrackUserHistoryController(req: Request, res: Response): Promise<Response> {
    const result: CreateSuccessService | ErrorService = await addTrackUserHistory(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }


    return res.status(result.code).json(result);

}

export async function postTrackUserLikeController(req: Request, res: Response): Promise<Response> {
    const result: CreateSuccessService<TrackLikeSummary> | ErrorService = await addTrackUserLike(req.body as Like);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}

export async function getTrackLikesController(req: Request, res: Response): Promise<Response> {
    const totalLikes: number = await getTrackLikeTotal(req.params.id as string);
    return res.status(200).json({ totalLikes });
}