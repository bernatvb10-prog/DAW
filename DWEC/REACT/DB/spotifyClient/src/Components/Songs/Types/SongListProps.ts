import type { GETTrack } from "../../../APIManagement/Tracks/Interfaces/Track";
import type { Track } from "../../../Model/Track";

export interface SongListProps {
    tracks: GETTrack[]
    play: (track: GETTrack) => void
    edit: (t: Track) => void
}