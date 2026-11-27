import { useEffect, useState } from "react";
import type { GETPlaylist } from "../../APIManagement/Playlists/Interfaces/Playlist";
import ListPlaylists from "../../Components/Playlists/ListPlaylists";
import { ENV } from "../../Config/env";

const PlaylistManagement = () => {
    const [playlists, setPlaylists] = useState<GETPlaylist[]>([]);

    async function carregarDadesPlaylist() {
        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/playlists`);
        const listPlaylist: GETPlaylist[] = await resposta.json() as GETPlaylist[];
        setPlaylists(listPlaylist);
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
                    {playlists.length > 0 ?
                        <ListPlaylists playlists={playlists} />
                        : <p>No hi ha llistes de reproducció disponibles</p>
                    }
                </section>
            </aside>
        </main>
    );
}

export default PlaylistManagement;
