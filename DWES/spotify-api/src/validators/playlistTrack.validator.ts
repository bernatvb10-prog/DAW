import { PlaylistTrack } from "../interfaces/playlistTrack/playlistTrack";

export function isValidPlaylistTrack(playlistTrack: PlaylistTrack): boolean {
    if (!playlistTrack || !playlistTrack.playlist || !playlistTrack.track) {
        return false;
    }

    return true;
}
