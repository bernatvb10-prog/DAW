import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Play from './Pages/Authenticated/Play'
import Header from './Components/PageEstructure/Header/Header'
import Menu from './Components/PageEstructure/menu/Menu'
import SongManagement from './Pages/Admin/SongManagement'
import PlaylistManagement from './Pages/Admin/PlaylistManagement'
import ArtistManagement from './Pages/Admin/ArtistManagement'

// PUNT DE REFLEXIÓ

function App() {
  return (
    <BrowserRouter>
      <Header title="Spotify" user={'Bernat'} />
      <Menu />
      <Routes>
        <Route path="/Play" element={<Play />}></Route>
        <Route path="/SongManagement" element={<SongManagement />}></Route>
        <Route path="/PlaylistManagement" element={<PlaylistManagement />}></Route>
        <Route path="/ArtistManagement" element={<ArtistManagement />}></Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App