import type { PlaylistListProps } from "./Types/PlaylistListProps";

const ListPlaylists = ({ playlists, onSelect }: PlaylistListProps) => (
    <table>
        <tbody>
            {playlists.map((playlist) => (
                <tr key={playlist.id}>
                    <td>{playlist.title}</td>
                    <td>
                        <button type="button" onClick={() => onSelect(playlist)}>
                            Select
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default ListPlaylists;
