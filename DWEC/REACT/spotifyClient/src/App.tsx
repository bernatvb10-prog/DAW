import { useState } from 'react';
import './App.css'
import Header from './Components/Header/Header';
import SongCard from './Components/Songs/SongCard'
import type { TrackView } from './Components/Songs/Types/TrackView';
import { tracks } from './Data/track';
import type { Track } from './Model/Track';
import { users } from './Data/User';

export function getCurrentDate(): string {
  const currentDate = new Date();
  const year: string = currentDate.getFullYear().toString();
  const month: string = (currentDate.getMonth() + 1).toString();
  const day: string = currentDate.getDate().toString();
  return `${day} /${month}/${year}`;
}

function getRandomTrack(): TrackView {
  const totalTracks: number = tracks.length;
  const random: number = Math.floor(Math.random() * totalTracks);
  const randomTrack: Track = tracks[random];

  return {
    ...randomTrack,
    reproduccions: Math.floor(Math.random() * 10000)
  };
}

function App() {
  const [randomUser] = useState(() => users[Math.floor(Math.random() * users.length)]);
  const [today] = useState(getCurrentDate);
  const [trackWr, setTrackWr] = useState<TrackView>(getRandomTrack);



  function handleClickRandom() {
    setTrackWr((currentTrack) => ({
      ...getRandomTrack(),
      reproduccions: currentTrack.reproduccions
    }));
  }

  return (
    <>
      <Header title="Spotify" user={randomUser.name} date={today} />
      <SongCard trackInfo={trackWr} />
      <p><button onClick={handleClickRandom}>Random</button></p >
    </>
  )
}

export default App