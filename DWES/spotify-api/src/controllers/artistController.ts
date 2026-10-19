import { Response, Request } from "express";
import { createArtist, deleteArtist, getAllArtists, getArtistById, putArtistById } from "../Services/artistService";
import { ArtistBD } from "../interfaces/artist/artistBD";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { artists } from "../data/artist/artist";
import { ErrorService } from "../interfaces/error/errorService";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { SelectSuccessService } from "../interfaces/error/selectSuccessService";

export async function getAllArtistsController(_req: Request, res: Response): Promise<Response> {
    const artists: ArtistBD[] = await getAllArtists();
    return res.status(200).json(artists);
}

export async function getArtistByIdController(req: Request, res: Response): Promise<Response> {
    const result: SelectSuccessService<ArtistBD> | ErrorService = await getArtistById(req.params.id as string);

    if (!result.success) {
        return res.status(result.code).json({ message: (result as ErrorService).message });
    }
    return res.status(result.code).json(result);
}

export async function postArtistController(req: Request, res: Response): Promise<Response> {
    const result: CreateSuccessService<ArtistBD> | ErrorService = await createArtist(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }


    return res.status(result.code).json(result);
}

export function putArtistController(req: Request, res: Response): Response {
    const result: UpdateSuccessService<ArtistBD> | ErrorService = putArtistById(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    const index: number = (result as UpdateSuccessService<ArtistBD>).index;
    artists[index] = (result as UpdateSuccessService<ArtistBD>).data;

    return res.status(result.code).json(result);
}

export function deleteArtistController(req: Request, res: Response): Response {
    const result: DeleteSuccessService | ErrorService = deleteArtist(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    const index: number = (result as DeleteSuccessService).index
    artists.splice(index, 1);

    return res.status(result.code).json(result);
}