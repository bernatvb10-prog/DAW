import type { PlaylistListProps } from "./Types/PlaylistListProps";

const ListPlaylists = ({ playlists }: PlaylistListProps) => (
    <table>
        <tbody>
            {playlists.map((playlist) => (
                <tr key={playlist.id}>
                    <td>{playlist.title}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default ListPlaylists;
