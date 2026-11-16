import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Play from './Pages/Authenticated/Play'
import Header from './Components/PageEstructure/Header/Header'
import Menu from './Components/PageEstructure/menu/Menu'
import SongManagement from './Pages/Admin/SongManagement'


function App() {
  return (
    <BrowserRouter>
      <Header title="Spotify" user={'Bernat'} />
      <Menu />
      <Routes>
        <Route path="/Play" element={<Play />}></Route>
        <Route path="/SongManagement" element={<SongManagement />}></Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App