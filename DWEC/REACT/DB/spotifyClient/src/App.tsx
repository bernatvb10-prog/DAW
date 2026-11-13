import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Play from './Pages/Authenticated/Play'
import Header from './Components/PageEstructure/Header/Header'
import Menu from './Components/PageEstructure/menu/Menu'


function App() {
  return (
    <BrowserRouter>
      <Header title="Spotify" user={'Bernat'} />
      <Menu/>
      <Routes>
        <Route path="/Play" element={<Play />}></Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App