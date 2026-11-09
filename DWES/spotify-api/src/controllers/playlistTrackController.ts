import { Response, Request } from "express";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { PlaylistTrackBD } from "../interfaces/playlistTrack/playlistTrackBD";
import { ErrorService } from "../interfaces/error/errorService";
import { createPlaylistTrack, deletePlaylistTrack } from "../Services/playlistTrackService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";


export async function postPlaylistTrackController(req: Request, res: Response): Promise<Response> {
    const result: CreateSuccessService<PlaylistTrackBD> | ErrorService = await createPlaylistTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}


export async function deletePlaylistTrackController(req: Request, res: Response): Promise<Response> {
    const result: DeleteSuccessService | ErrorService = await deletePlaylistTrack(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }


    return res.status(result.code).json(result);
}