import type { ArtistCreate } from "../../../APIManagement/Artists/Interfaces/ArtistCreate";

export interface AddArtistFormProps {
    submit: (artist: ArtistCreate) => Promise<void>;
}
