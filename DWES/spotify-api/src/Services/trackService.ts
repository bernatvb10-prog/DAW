import { randomUUID } from "crypto";
import { tracks } from "../data/track/track";
import { Track } from "../interfaces/track/track";
import { TrackBD } from "../interfaces/track/trackBD";
import { isValidTrack } from "../validators/track.validator";
import { ErrorService } from "../interfaces/error/errorService";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { artists } from "../data/artist/artist";
import { ArtistBD } from "../interfaces/artist/artistBD";

export function getAllTracks(): TrackBD[] {
    return tracks;
}

export function getTrackById(idTrack: string): TrackBD | undefined {

    return tracks.find((t: TrackBD) => { return t.id === idTrack });
}

export function createTrack(track: Track): CreateSuccessService<TrackBD> | ErrorService {

    if (!isValidTrack(track)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const uuid: string = randomUUID()

    const trackRecord: TrackBD = {
        id: uuid,
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist.trim().replace(/\s+/g, " "),
        duration: track.duration
    };

    return { success: true, code: 201, data: trackRecord };

}

export function putTrackById(track: Track, idTrack: string): UpdateSuccessService<TrackBD> | ErrorService {
    if (!isValidTrack(track)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const index: number = tracks.findIndex((t: TrackBD) => { return t.id === idTrack; });
    if (index === -1) {
        return { success: false, code: 404, message: "Track not found" };
    }

    const updatedTrack: TrackBD = {
        id: idTrack,
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist.trim().replace(/\s+/g, " "),
        duration: track.duration
    };

    return { success: true, code: 200, index: index, data: updatedTrack };
}

export function deleteTrack(idTrack: string): DeleteSuccessService | ErrorService {

    const trackIndex: number = tracks.findIndex((track: TrackBD) => track.id === idTrack);

    if (trackIndex === -1) {
        return { success: false, code: 404, message: "Track not found" };
    }

    return { success: true, code: 204, index: trackIndex };
}



