import { useEffect, useRef, useState } from "react";
import type { GETTrack } from "../../APIManagement/Tracks/Interfaces/Track";
import ListSongs from "../../Components/Songs/ListSongs";
import { ENV } from "../../Config/env";
import AddSongForm from "../../Components/Songs/AddSongForm";



const SongManagement = () => {
    const [tracks, setTracks] = useState<GETTrack[]>([]);
    const [newSong, setNewSong] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    async function carregarDadesTrack() {
        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/tracks`);
        const listTrack: GETTrack[] = await resposta.json() as GETTrack[];
        setTracks(listTrack);
        // setNewSong(false);
    }

    useEffect(
        () => {
            carregarDadesTrack();
        }, []);

    function addSong() {
        setNewSong(true);
    }

    function handlePlay(track: GETTrack): void {
        const previewUrl = (track as GETTrack & { preview_url?: string | null }).preview_url;
        if (!previewUrl) {
            console.warn("This track does not have a playable preview.");
            return;
        }

        audioRef.current?.pause();
        const audio = new Audio(previewUrl);
        audioRef.current = audio;
        void audio.play().catch((error: unknown) => {
            console.error("Unable to play the track:", error);
        });
    }

    return (
        <>
            <main>
                <h1>Llistat de cançons</h1>
                <aside className="lists-panel">
                    <section className="list-panel">
                        <h2>Cançons</h2>
                        {
                            tracks.length > 0 ?
                                <table>
                                    <tbody>
                                        <ListSongs tracks={tracks} play={handlePlay} />
                                    </tbody>
                                </table>
                                : <p>No hi ha cançons disponibles</p>
                        }

                    </section>
                </aside>
            </main>
            {
                newSong ?
                    <AddSongForm refreshSongs={carregarDadesTrack} />
                    : <button className="add-song-button" onClick={addSong}> Nova</button>
            }
        </>
    )
}

export default SongManagement;