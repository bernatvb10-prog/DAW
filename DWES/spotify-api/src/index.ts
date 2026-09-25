import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { TrackBD } from "./interfaces/track/trackBD";
import { tracks } from "./data/track/track";
import { Track } from "./interfaces/track/track";
import { isValidTrack } from "./validators/track.validator";
import { randomUUID } from "crypto";

const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.json(JSON.stringify(APICONFIG));
});

app.get("/tracks", (_req: Request, res: Response) => {
    return res.status(200).json(tracks);
});

app.get("/tracks/:id", (req: Request, res: Response) => {
    const idTrack: string = req.params.id as string;
    const track: TrackBD[] = tracks.filter(
        (t: TrackBD) => { return t.id === idTrack }
    );

    if (track.length === 0) {
        return res.status(404).json({ message: `Track ${idTrack} not found` })
    }
    return res.status(200).json(track);
});

// Saber totes les llistes de reproducció d'un usuari

// /usuaris/:id/playlists

// Les últimes cançons que ha escoltat un usuari

// /usuaris/:id/songs/recents
// /usuaris/:id/historial

// Les ultimes cançons que hem carregat a l'Spotify

// /songs/uploaded/latest

// Totes les cançons de una playlist de un usuari

// /usuaris/:id/playlist/:idPlayList/songs

// El meu perfil

// /usuaris/profile

// El perfil de un altre usuari

// /usuaris/:id/profile

// Musica mes reproduida

// /songs/popular

// Musica mes reproduida de un artista en concret

// /artists/:id/songs/popular

// L'artista amb mes reproduccions

// /artists/reproductions/popular

app.post("/tracks", (req: Request, res: Response) => {
    const track: Track = req.body;
    if (!isValidTrack(track)) {
        return res.status(400).json({ message: "Invalid data" });
    }

    const uuid: string = randomUUID();

    const trackRecord: TrackBD = {
        id: uuid,
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist.trim().replace(/\s+/g, " "),
        duration: track.duration
    };

    return res.status(201).json(trackRecord);
});

app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a ${APICONFIG.host}:${APICONFIG.port}`);
});