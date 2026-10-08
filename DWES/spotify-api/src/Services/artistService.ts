import { randomUUID } from "crypto";
import { artists } from "../data/artist/artist";
import { Artist } from "../interfaces/artist/artist";
import { ArtistBD } from "../interfaces/artist/artistBD";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { ErrorService } from "../interfaces/error/errorService";
import { getCanonicalCountry, isValidArtist } from "../validators/artist.validator";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";

export function getAllArtists(): ArtistBD[] {
    return artists;
}

export function getArtistById(idArtist: string): ArtistBD | undefined {
    return artists.find((a: ArtistBD) => { return a.id === idArtist });
}

export function createArtist(artist: Artist): CreateSuccessService<ArtistBD> | ErrorService {

    if (!isValidArtist(artist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const idartista: string = randomUUID()
    
    const artistRecord: ArtistBD = {
        id: idartista,
        artistName: artist.artistName.trim().replace(/\s+/g, " "),
        realName: artist.realName.trim().replace(/\s+/g, " "),
        country: getCanonicalCountry(artist.country)
    };

    return { success: true, code: 201, data: artistRecord };
}

export function putArtistById(artist: Artist, idArtist: string): UpdateSuccessService<ArtistBD> | ErrorService {
    
    
    if (!isValidArtist(artist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const index: number = artists.findIndex((a: ArtistBD) => { return a.id === idArtist; });
    if (index === -1) {
        return { success: false, code: 404, message: "Track not found" };
    }

    const updatedArtist: ArtistBD = {
        id: idArtist,
        artistName: artist.artistName.trim().replace(/\s+/g, " "),
        realName: artist.realName.trim().replace(/\s+/g, " "),
        country: artist.country
    };

    return { success: true, code: 200, index: index, data: updatedArtist };
}
