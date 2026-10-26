import { useState } from 'react';
import './App.css'
import Header from './Components/Header/Header';
import SongCard from './Components/Songs/SongCard'
import type { TrackView } from './Components/Songs/Types/TrackView';
import { tracks } from './Data/track';
import type { Track } from './Model/Track';
import { users } from './Data/User';



function getRandomTrack(): TrackView {
  const totalTracks: number = tracks.length;
  const random: number = Math.floor(Math.random() * totalTracks);
  const randomTrack: Track = tracks[random];

  return {
    ...randomTrack,
    reproduccions: Math.floor(Math.random() * 10000),
    likes: Math.random() * 10000
  };
}

function App() {

  const [randomUser] = useState(() => users[Math.floor(Math.random() * users.length)]);
  const [track, setTrack] = useState<TrackView>(getRandomTrack);

  function incrementarReproduccions() {
    const tr = (prev: TrackView): TrackView => {
      return {
        ...prev,
        reproduccions: prev.reproduccions + 1
      }
    }
    setTrack(tr);
  }


  function handleClickRandom() {
    setTrack((currentTrack) => ({
      ...getRandomTrack()
    }));
  }

  return (
    <>
      <Header title="Spotify" user={randomUser.name} />
      <SongCard trackInfo={track} play={() => incrementarReproduccions()} />
      <p><button onClick={handleClickRandom}>Random</button></p >
    </>
  )
}

export default App