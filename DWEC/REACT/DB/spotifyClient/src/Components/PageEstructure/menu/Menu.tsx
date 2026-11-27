import { Link } from "react-router"

const Menu = () => {
    return (
        <nav>
            <Link to="/Play">Reproductor</Link>
            <Link to="/SongManagement">Gestió cançons</Link>
            <Link to="/PlaylistManagement">Gestió llistes de reproducció</Link>
            <Link to="/ArtistManagement">Gestió Artistes</Link>
        </nav>
    )
}

export default Menu;