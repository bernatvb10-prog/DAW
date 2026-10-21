import './App.css'
import SongCard from './Components/Songs/SongCard'
import type { TrackView } from './Components/Songs/Types/TrackView';
import { tracks } from './Data/track';
import type { Track } from './Model/Track';

function App() {

  const totalTracks: number = tracks.length;
  const random: number = Math.floor(Math.random() * totalTracks);
  const track: Track = tracks[random];
  const trackWr: TrackView = {
    ...track,
    reproduccions: Math.floor(Math.random() * 10000)
  };


  return (
    <>
      <SongCard trackInfo={trackWr} />
    </>
  )
}

export default App