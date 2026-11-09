import { Response, Request } from "express";
import { createPlaylist, deletePlaylist, getAllPlaylists, getPlaylistById, putPlaylistById } from "../Services/playlistService";
import { PlaylistBD } from "../interfaces/playlist/playlistBD";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { ErrorService } from "../interfaces/error/errorService";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { getTracksByPlaylistId } from "../Services/playlistTrackService";
import { TrackBD } from "../interfaces/track/trackBD";


export async function getAllPlaylistsController(_req: Request, res: Response): Promise<Response> {
    return res.status(200).json(await getAllPlaylists());
}

export async function getPlaylistByIdController(req: Request, res: Response): Promise<Response> {
    const playlist: PlaylistBD | undefined = await getPlaylistById(req.params.id as string);

    if (!playlist) {
        return res.status(404).json({ message: `Playlist not found` });
    }
    return res.status(200).json(playlist);
}

export async function getPlaylistTracksController(req: Request, res: Response): Promise<Response> {
    const tracks: TrackBD[] | undefined = await getTracksByPlaylistId(req.params.id as string);

    if (!tracks) {
        return res.status(404).json({ message: "Playlist not found" });
    }

    return res.status(200).json(tracks);
}

export async function postPlaylistController(req: Request, res: Response): Promise<Response> {
    const result: CreateSuccessService<PlaylistBD> | ErrorService = await createPlaylist(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}

export async function putPlaylistController(req: Request, res: Response): Promise<Response> {
    const result: UpdateSuccessService<number> | ErrorService = await putPlaylistById(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }


    return res.status(result.code).json(result);
}

export async function deletePlaylistController(req: Request, res: Response): Promise<Response> {
    const result: DeleteSuccessService | ErrorService = await deletePlaylist(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}