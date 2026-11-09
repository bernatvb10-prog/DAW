import { useEffect, useState } from 'react';
import './App.css'
import Header from './Components/Header/Header';
import SongCard from './Components/Songs/SongCard'
import Reproduint from './Components/Reproduint/Reproduint';
import type { TrackView } from './Components/Songs/Types/TrackView';
import { users } from './Data/User';
import type { Like } from './Components/Songs/Types/Like';
import ListSongs from './Components/Songs/ListSongs';
import { ENV } from './Config/env';
import type { GETTrack } from './APIManagement/Tracks/Interfaces/Track';
import type { GETPlaylist } from './APIManagement/Playlists/Interfaces/Playlist';
import ListPlaylists from './Components/Playlists/ListPlaylists';
import PlaylistSongs from './Components/Playlists/PlaylistSongs';
import type { AddHistory } from './APIManagement/History/Interfaces/HistoryCreate';


function App() {

  const [tracks, setTracks] = useState<GETTrack[]>([]);
  const [playlists, setPlaylists] = useState<GETPlaylist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<GETPlaylist | null>(null);
  const [playlistTracks, setPlaylistTracks] = useState<GETTrack[]>([]);
  const [playlistError, setPlaylistError] = useState<string | null>(null);
  const [loadingPlaylist, setLoadingPlaylist] = useState(false);
  const [randomUser] = useState(() => users[Math.floor(Math.random() * users.length)]);
  const [track, setTrack] = useState<TrackView>(getRandomTrack);
  const [playingTrackTitle, setPlayingTrackTitle] = useState<string | null>(null);

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
          : { like: false, totalLikes: 0 }
      }));
    }

    incrementarReproduccions();
    setPlayingTrackTitle(trackToPlay?.title ?? track.title);
  }


  function handleClickRandom() {
    setTrack(() => ({
      ...getRandomTrack()
    }));
  }

  function gestionarLikes() {
    const tr = (prev: TrackView): TrackView => {
      let increment: number = 1;
      if (prev.likes.like) {
        increment = -1;
      }
      let likeObj: Like = {
        like: !prev.likes.like,
        totalLikes: prev.likes.totalLikes + increment
      };

      return {
        ...prev,
        likes: likeObj
      }
    }
    setTrack(tr);
  }

  function gestionarReset() {
    setTrack((prev) => ({
      ...prev,
      reproduccions: 0,
      likes: {
        like: false,
        totalLikes: 0
      }
    }));
  }

  return (
    <>
      <Header title="Spotify" user={randomUser.name} />
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
          <SongCard trackInfo={track} play={handlePlay} like={() => gestionarLikes()} reset={() => gestionarReset()} />
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

export default App