import { useEffect, useState } from "react";
import type { GETPlaylist } from "../../APIManagement/Playlists/Interfaces/Playlist";
import { DeletePlaylist } from "../../APIManagement/Playlists/DeletePlaylist";
import ListPlaylists from "../../Components/Playlists/ListPlaylists";
import { ENV } from "../../Config/env";

const PlaylistManagement = () => {
    const [playlists, setPlaylists] = useState<GETPlaylist[]>([]);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    async function carregarDadesPlaylist() {
        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/playlists`);
        const listPlaylist: GETPlaylist[] = await resposta.json() as GETPlaylist[];
        setPlaylists(listPlaylist);
    }

    async function deletePlaylist(playlist: GETPlaylist) {
        setDeleteError(null);
        try {
            await DeletePlaylist(playlist.id);
            await carregarDadesPlaylist();
        } catch (error) {
            setDeleteError(
                error instanceof Error
                    ? `No s'ha pogut eliminar la playlist: ${error.message}`
                    : "No s'ha pogut eliminar la playlist"
            );
        }
    }

    useEffect(() => {
        carregarDadesPlaylist();
    }, []);

    return (
        <main>
            <h1>Llistat de llistes de reproducció</h1>
            <aside className="lists-panel">
                <section className="list-panel">
                    <h2>Llistes de reproducció</h2>
                    {deleteError && <p role="alert">{deleteError}</p>}
                    {playlists.length > 0 ?
                        <ListPlaylists playlists={playlists} onDelete={deletePlaylist} />
                        : <p>No hi ha llistes de reproducció disponibles</p>
                    }
                </section>
            </aside>
        </main>
    );
}

export default PlaylistManagement;
