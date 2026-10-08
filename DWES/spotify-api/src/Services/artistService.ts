import { artists } from "../data/artist/artist";
import { ArtistBD } from "../interfaces/artist/artistBD";

export function getAllArtists(): ArtistBD[] {
    return artists;
}

export function getArtistById(idArtist: string): ArtistBD | undefined {
    return artists.find((a: ArtistBD) => { return a.id === idArtist });
}

