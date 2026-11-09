import type { GETTrack } from "../../APIManagement/Tracks/Interfaces/Track";
import ListSongs from "../Songs/ListSongs";

interface PlaylistSongsProps {
    title: string;
    tracks: GETTrack[];
    loading: boolean;
    error: string | null;
    play: (track: GETTrack) => void;
}

const PlaylistSongs = ({ title, tracks, loading, error, play }: PlaylistSongsProps) => (
    <section className="list-panel">
        <h2>{title}</h2>
        {loading ? <p>Carregant...</p> : error ? <p>{error}</p> : tracks.length > 0 ? (
            <table>
                <tbody>
                    <ListSongs tracks={tracks} play={play} />
                </tbody>
            </table>
        ) : <p>Aquesta llista no té cançons</p>}
    </section>
);

export default PlaylistSongs;
