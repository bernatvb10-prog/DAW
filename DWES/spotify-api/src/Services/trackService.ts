import { tracks } from "../data/track/track";
import { TrackBD } from "../interfaces/track/trackBD";

export function getAllTracks(): TrackBD[] {
    return tracks;
}

export function getTrackById(idTrack: string): TrackBD | undefined {

    return tracks.find((t: TrackBD) => { return t.id === idTrack });
}