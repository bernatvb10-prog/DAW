import { useEffect, useState } from "react";
import type { GETTrack } from "../../APIManagement/Tracks/Interfaces/Track";
import ListSongs from "../../Components/Songs/ListSongs";
import { ENV } from "../../Config/env";
import AddSongForm from "../../Components/Songs/AddSongForm";
import type { FormState } from "./Types/FormState";
import type { Track } from "../../Model/Track";
import type { TrackCreate } from "../../APIManagement/Tracks/Interfaces/TrackCreate";
import { PostTrack } from "../../APIManagement/Tracks/PostTrack";
import { PutTrack } from "../../APIManagement/Tracks/PutTrack";
import { DeleteTrack } from "../../APIManagement/Tracks/DeleteTrack";



const SongManagement = () => {
    const [tracks, setTracks] = useState<GETTrack[]>([]);
    const [newSong, setNewSong] = useState<FormState>({ mode: "none" });

    async function carregarDadesTrack() {
        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/tracks`);
        const listTrack: GETTrack[] = await resposta.json() as GETTrack[];
        console.log(listTrack);
        setTracks(listTrack);
    }

    useEffect(
        () => {
            carregarDadesTrack();
        }, []);

    function addSong() {
        setNewSong({ mode: "new" });
    }

    function edit(t: Track) {
        setNewSong({
            mode: "edit",
            song: t
        });
    }

    async function save(t: TrackCreate) {
        await PostTrack(t);
        await carregarDadesTrack()
        setNewSong({ mode: "none" });
    }

    async function update(t: TrackCreate) {
        const id = newSong.mode === "edit" ? newSong.song.id : "";
        await PutTrack(t, id);
        await carregarDadesTrack()
        setNewSong({ mode: "none" });
    }

    async function deleteSong(track: GETTrack) {
        await DeleteTrack(track.id);
        await carregarDadesTrack();
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
                                        <ListSongs tracks={tracks} edit={edit} delete={deleteSong} />
                                    </tbody>
                                </table>
                                : <p>No hi ha cançons disponibles</p>
                        }

                    </section>
                </aside>
            </main>
            {
                newSong.mode === "new" ?
                    <AddSongForm submit={(t) => save(t)} />
                    : newSong.mode === "edit" ?
                        <AddSongForm submit={(t) => update(t)} song={newSong.song} />
                        : <button className="add-song-button" onClick={addSong}> Afegir</button>
            }
        </>
    )
}

export default SongManagement;