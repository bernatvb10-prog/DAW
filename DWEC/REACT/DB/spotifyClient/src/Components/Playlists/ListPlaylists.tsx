import type { PlaylistListProps } from "./Types/PlaylistListProps";

const ListPlaylists = ({ playlists, onSelect, onDelete }: PlaylistListProps) => (
    <table>
        <tbody>
            {playlists.map((playlist) => (
                <tr key={playlist.id}>
                    <td>{playlist.title}</td>
                    {onSelect && (
                        <td>
                            <button type="button" onClick={() => onSelect(playlist)}>
                                Select
                            </button>
                        </td>
                    )}
                    {onDelete && (
                        <td>
                            <button type="button" onClick={() => onDelete(playlist)}>
                                Delete
                            </button>
                        </td>
                    )}
                </tr>
            ))}
        </tbody>
    </table>
);

export default ListPlaylists;
