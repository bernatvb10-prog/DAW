import type { GETPlaylist } from "../../../APIManagement/Playlists/Interfaces/Playlist";

export interface PlaylistListProps {
    playlists: GETPlaylist[];
    onSelect: (playlist: GETPlaylist) => void;
}
