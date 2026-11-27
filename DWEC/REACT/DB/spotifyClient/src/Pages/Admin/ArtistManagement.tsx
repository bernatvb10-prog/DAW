import { useEffect, useState } from "react";
import type { GETArtist } from "../../APIManagement/Artists/Interfaces/Artists";
import type { ArtistCreate } from "../../APIManagement/Artists/Interfaces/ArtistCreate";
import { PostArtist } from "../../APIManagement/Artists/PostArtist";
import { ENV } from "../../Config/env";
import AddArtistForm from "../../Components/Artists/AddArtistForm";

const ArtistManagement = () => {
    const [artists, setArtists] = useState<GETArtist[]>([]);
    const [addingArtist, setAddingArtist] = useState(false);

    async function carregarDadesArtist() {
        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/artists`);
        const listArtist: GETArtist[] = await resposta.json() as GETArtist[];
        setArtists(listArtist);
    }

    useEffect(() => {
        carregarDadesArtist();
    }, []);

    async function saveArtist(artist: ArtistCreate) {
        await PostArtist(artist);
        await carregarDadesArtist();
        setAddingArtist(false);
    }

    return (
        <>
            <main>
                <h1>Llistat d'artistes</h1>
                <aside className="lists-panel">
                    <section className="list-panel">
                        <h2>Artistes</h2>
                        {artists.length > 0 ?
                            <table>
                                <tbody>
                                    {artists.map((artist) => (
                                        <tr key={artist.id}>
                                            <td>{artist.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            : <p>No hi ha artistes disponibles</p>
                        }
                    </section>
                </aside>
            </main>
            {addingArtist
                ? <AddArtistForm submit={saveArtist} />
                : <button className="add-song-button" onClick={() => setAddingArtist(true)}>
                    Afegir
                </button>
            }
        </>
    );
}

export default ArtistManagement;
