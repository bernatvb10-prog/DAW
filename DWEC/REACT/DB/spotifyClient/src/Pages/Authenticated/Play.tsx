import { useState, useEffect } from "react";
import type { AddHistory } from "../../APIManagement/History/Interfaces/HistoryCreate";
import type { AddLike, TrackLikeSummary, TrackLikeTotal } from "../../APIManagement/Likes/Interfaces/LikeCreate";
import type { GETPlaylist } from "../../APIManagement/Playlists/Interfaces/Playlist";
import type { GETTrack } from "../../APIManagement/Tracks/Interfaces/Track";
import ListPlaylists from "../../Components/Playlists/ListPlaylists";
import PlaylistSongs from "../../Components/Playlists/PlaylistSongs";
import Reproduint from "../../Components/Reproduint/Reproduint";
import ListSongs from "../../Components/Songs/ListSongs";
import SongCard from "../../Components/Songs/SongCard";
import type { TrackView } from "../../Components/Songs/Types/TrackView";
import { ENV } from "../../Config/env";
import { users } from "../../Data/User";

const Play = () => {

    const [tracks, setTracks] = useState<GETTrack[]>([]);
    const [playlists, setPlaylists] = useState<GETPlaylist[]>([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState<GETPlaylist | null>(null);
    const [playlistTracks, setPlaylistTracks] = useState<GETTrack[]>([]);
    const [playlistError, setPlaylistError] = useState<string | null>(null);
    const [loadingPlaylist, setLoadingPlaylist] = useState(false);
    const [randomUser] = useState(() => users[Math.floor(Math.random() * users.length)]);
    const [track, setTrack] = useState<TrackView>(getRandomTrack);
    const [playingTrackTitle, setPlayingTrackTitle] = useState<string | null>(null);
    const [likesLoading, setLikesLoading] = useState(false);
    const [likeError, setLikeError] = useState<string | null>(null);
    const [likedTracks, setLikedTracks] = useState<Record<string, boolean>>({});

    async function carregarDadesTrack() {
        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/tracks`);
        const listTrack: GETTrack[] = await resposta.json() as GETTrack[];
        setTracks(listTrack)
    }

    async function carregarDadesPlaylist() {
        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/playlists`);
        const listPlaylist: GETPlaylist[] = await resposta.json() as GETPlaylist[];
        setPlaylists(listPlaylist);
    }

    async function seleccionarPlaylist(playlist: GETPlaylist) {
        setPlaylistError(null);
        setSelectedPlaylist(playlist);
        setPlaylistTracks([]);
        setLoadingPlaylist(true);

        try {
            const resposta: Response = await fetch(
                `${ENV.API_BASE_URL}/playlists/${playlist.id}/tracks`
            );
            if (!resposta.ok) {
                throw new Error(`Error carregant la playlist (${resposta.status})`);
            }

            const listTrack: GETTrack[] = await resposta.json() as GETTrack[];
            setPlaylistTracks(listTrack);
        } catch (error) {
            setPlaylistError(error instanceof Error ? error.message : "Error carregant la playlist");
        } finally {
            setLoadingPlaylist(false);
        }
    }

    useEffect(
        () => {
            carregarDadesTrack();
            carregarDadesPlaylist();
        }, []);

    useEffect(() => {
        if (!track.id) {
            return;
        }

        let active = true;
        setLikesLoading(true);
        setLikeError(null);

        async function carregarLikes() {
            try {
                const resposta: Response = await fetch(
                    `${ENV.API_BASE_URL}/tracks/${track.id}/likes`
                );
                if (!resposta.ok) {
                    throw new Error(`Error carregant els likes (${resposta.status})`);
                }

                const likes: TrackLikeTotal = await resposta.json() as TrackLikeTotal;
                if (active) {
                    setTrack((prev) => prev.id === track.id
                        ? {
                            ...prev,
                            likes: {
                                ...prev.likes,
                                totalLikes: likes.totalLikes
                            }
                        }
                        : prev
                    );
                }
            } catch (error) {
                if (active) {
                    setLikeError(error instanceof Error ? error.message : "Error carregant els likes");
                }
            } finally {
                if (active) {
                    setLikesLoading(false);
                }
            }
        }

        carregarLikes();
        return () => {
            active = false;
        };
    }, [track.id]);


    function getRandomTrack(): TrackView {
        const random: number = Math.floor(Math.random() * tracks.length);
        const randomTrack: GETTrack = tracks[random];

        return {
            ...randomTrack,
            reproduccions: Math.floor(Math.random() * 10000),
            likes: {
                like: false,
                totalLikes: 0
            }
        };
    }

    async function incrementarReproduccions() {
        const tr = (prev: TrackView): TrackView => {
            return {
                ...prev,
                reproduccions: prev.reproduccions + 1
            }
        }

        setTrack(tr);

        const newHistory: AddHistory = {
            user: "95E30139-D7D4-4BBF-9293-495807DCD9CD",
            track: tracks[0].id
        }

        const response: Response = await fetch(
            "http://localhost:3000/tracks/user/history",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newHistory)
            }
        )

        if (!response.ok) {
            return false;
        }

        const result = await response.json();
        console.log(result);
    }

    function handlePlay(trackToPlay?: GETTrack) {
        if (trackToPlay) {
            setTrack((prev) => ({
                ...trackToPlay,
                reproduccions: prev.title === trackToPlay.title ? prev.reproduccions : 0,
                likes: prev.title === trackToPlay.title
                    ? prev.likes
                    : { like: likedTracks[trackToPlay.id] ?? false, totalLikes: 0 }
            }));
        }

        incrementarReproduccions();
        setPlayingTrackTitle(trackToPlay?.title ?? track.title);
    }


    function handleClickRandom() {
        const randomTrack = getRandomTrack();
        setTrack((prev) => ({
            ...randomTrack,
            likes: {
                like: randomTrack.id ? likedTracks[randomTrack.id] ?? false : false,
                totalLikes: randomTrack.id === prev.id ? prev.likes.totalLikes : 0
            }
        }));
    }

    async function gestionarLikes() {
        if (!track.id || likesLoading) {
            return;
        }

        const trackId = track.id;
        setLikesLoading(true);
        setLikeError(null);
        const newLike: AddLike = {
            user: "95E30139-D7D4-4BBF-9293-495807DCD9CD",
            track: trackId,
            likeTrack: track.likes.like ? -1 : 1
        };

        try {
            const resposta: Response = await fetch(`${ENV.API_BASE_URL}/tracks/user/likes`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newLike)
            });
            if (!resposta.ok) {
                throw new Error(`Error desant el like (${resposta.status})`);
            }

            const result: { data: TrackLikeSummary } = await resposta.json() as { data: TrackLikeSummary };
            const isLiked = result.data.userLike > 0;
            setLikedTracks((prev) => ({ ...prev, [trackId]: isLiked }));
            setTrack((prev) => prev.id === trackId
                ? {
                    ...prev,
                    likes: {
                        like: isLiked,
                        totalLikes: result.data.totalLikes
                    }
                }
                : prev
            );
        } catch (error) {
            setLikeError(error instanceof Error ? error.message : "Error desant el like");
        } finally {
            setLikesLoading(false);
        }
    }

    function gestionarReset() {
        setTrack((prev) => ({
            ...prev,
            reproduccions: 0
        }));
    }

    return (
        <>
            <main>
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
                    <section className="list-panel">
                        <h2>Llistes de reproducció</h2>
                        {
                            playlists.length > 0 ?
                                <ListPlaylists playlists={playlists} onSelect={seleccionarPlaylist} />
                                : <p>No hi ha llistes de reproducció disponibles</p>
                        }
                    </section>
                    {selectedPlaylist && (
                        <PlaylistSongs
                            title={selectedPlaylist.title}
                            tracks={playlistTracks}
                            loading={loadingPlaylist}
                            error={playlistError}
                            play={handlePlay}
                        />
                    )}
                </aside>

                <section>
                    <SongCard trackInfo={track} play={handlePlay} like={() => gestionarLikes()} likeDisabled={likesLoading} reset={() => gestionarReset()} />
                    {likeError && <p role="alert">{likeError}</p>}
                </section>
                <p><button onClick={handleClickRandom}>Random</button></p >
                <Reproduint
                    playingTrackTitle={playingTrackTitle}
                    stop={() => setPlayingTrackTitle(null)}
                />
            </main>
        </>
    )
}

export default Play;