import { Playlist } from "../interfaces/playlist/playlist";
import { MAXTITOL } from "../interfaces/playlist/playlist.constants";

export function isValidPlaylist(playlist: Playlist): boolean {
    if (!playlist || !playlist.title || !playlist.user) {
        return false;
    }

    const titleLength: number = playlist.title.trim().replace(/\s+/g, " ").length;
    const titleOK: boolean = titleLength > 0 && titleLength <= MAXTITOL;

    if (!titleOK) {
        return false;
    }

    return titleOK;
}
