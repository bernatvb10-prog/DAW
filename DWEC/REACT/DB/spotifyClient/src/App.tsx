import { useState } from 'react';
import './App.css'
import Header from './Components/Header/Header';
import SongCard from './Components/Songs/SongCard'
import Reproduint from './Components/Reproduint/Reproduint';
import type { TrackView } from './Components/Songs/Types/TrackView';
import type { Track } from './Model/Track';
import { users } from './Data/User';
import type { Like } from './Components/Songs/Types/Like';
import ListSongs from './Components/Songs/ListSongs';


function App() {

  const [tracks, setTracks] = useState<Track[]>([]);
  const [randomUser] = useState(() => users[Math.floor(Math.random() * users.length)]);
  const [track, setTrack] = useState<TrackView>(getRandomTrack);
  const [playingTrackTitle, setPlayingTrackTitle] = useState<string | null>(null);

  async function carregarDadesTrack() {
    const resposta: Response = await fetch("http://localhost:3000/tracks");
    const listTrack: Track[] = await resposta.json() as Track[];
    setTracks(listTrack)
  }

  function getRandomTrack(): TrackView {
    const random: number = Math.floor(Math.random() * tracks.length);
    const randomTrack: Track = tracks[random];

    return {
      ...randomTrack,
      reproduccions: Math.floor(Math.random() * 10000),
      likes: {
        like: false,
        totalLikes: 0
      }
    };
  }

  function incrementarReproduccions() {
    const tr = (prev: TrackView): TrackView => {
      return {
        ...prev,
        reproduccions: prev.reproduccions + 1
      }
    }
    setTrack(tr);
  }

  function handlePlay() {
    incrementarReproduccions();
    setPlayingTrackTitle(track.title);
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
        {
          tracks.length > 0 ?
            <table>
              <thead>
                <title>List Songs</title>
              </thead>
              <tbody>
                <ListSongs tracks={tracks} />
              </tbody>
            </table>
            : <p>
              <button onClick={carregarDadesTrack}>Carregar Tracks</button>
            </p>
        }

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