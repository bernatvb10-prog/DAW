import { countries } from "../data/country/country";
import { Artist } from "../interfaces/artist/artist";
import { MAXARTISTNAME, MAXREALNAME } from "../interfaces/artist/artist.constants";
import { CountryBD } from "../interfaces/country/countryBD";

export function isValidArtist(artist: Artist): boolean | string | undefined {
    // valido que hi hagi un artista (body)
    if (!artist) {
        return false;
    }

    // valido que totes les dades del body siguin presents segons l'artista
    if (!artist.artistName || !artist.realName || !artist.country) {
        return false;
    }

    // valido dades que no son foreign key
    const artistNameLength: number = artist.artistName.trim().replace(/\s+/g, " ").length;
    const realNameLength: number = artist.realName.trim().replace(/\s+/g, " ").length;

    const dadesOK: boolean = artistNameLength > 0
        && artistNameLength <= MAXARTISTNAME
        && realNameLength > 0
        && realNameLength <= MAXREALNAME

    if (!dadesOK) {
        return false;
    }

    // valido que l'identificador de pais sigui valid

    const countryOK: CountryBD | undefined = countries.find(
        (c: CountryBD) => { c.id === artist.country }
    )

    if (!countryOK) {
        return false;
    }

    return true;
}
