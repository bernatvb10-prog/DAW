import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { TrackBD } from "./interfaces/track/trackBD";
import { tracks } from "./data/track/track";
import { Track } from "./interfaces/track/track";
import { isValidTrack } from "./validators/track.validator";
import { randomUUID } from "crypto";
import { artists } from "./data/artist/artist";
import { getCanonicalCountry, isValidArtist } from "./validators/artist.validator";
import { Artist } from "./interfaces/artist/artist";
import { Country } from "./interfaces/country/country";
import { isValidCountry } from "./validators/country.validator";
import { CountryBD } from "./interfaces/country/countryBD";
import { countries } from "./data/country/country";
import { ArtistBD } from "./interfaces/artist/artistBD";
import { createTrack, getAllTracks, getTrackById, putTrackById } from "./Services/trackService";
import { ErrorService } from "./interfaces/error/errorService";
import { CreateSuccessService } from "./interfaces/error/createSucessService";
import { UpdateSuccessService } from "./interfaces/error/updateSuccessService";


const port: number = 3000;

const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    return res.json(JSON.stringify(APICONFIG));
});


app.get("/tracks", (_req: Request, res: Response) => {
    return res.status(200).json(getAllTracks());
});


app.get("/tracks/:id", (req: Request, res: Response) => {
    const track: TrackBD | undefined = getTrackById(req.params.id as string);

    if (!track) {
        return res.status(404).json({ message: `Track not found` });
    }
    return res.status(200).json(track);
});

app.get("/artists", (_req: Request, res: Response) => {
    return res.status(200).json(artists);
});

app.get("/artists/:id", (req: Request, res: Response) => {
    const idArtist: string = req.params.id as string;
    const artist: ArtistBD | undefined = artists.find(
        (a: ArtistBD) => { return a.id === idArtist }
    );
    if (!artist) {
        return res.status(404).json({ message: `Artist ${idArtist} not found` });
    }
    return res.status(200).json(artist);
});

app.post("/tracks", (req: Request, res: Response) => {

    const result: CreateSuccessService<TrackBD> | ErrorService = createTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }


    tracks.push((result as CreateSuccessService<TrackBD>).data);
    return res.status(result.code).json(result);
});

app.put("/tracks/:id", (req: Request, res: Response) => {
    const idTrack: string = req.params.id as string;
    const result: UpdateSuccessService<TrackBD> | ErrorService = putTrackById(idTrack, req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    const updatedTrack: TrackBD = ((result as UpdateSuccessService<TrackBD>).data)
    tracks[(result as UpdateSuccessService<TrackBD>).index] = updatedTrack;
    return res.status(result.code).json(result);
});

app.delete("/tracks/:id", (req: Request, res: Response) => {
    const idTrack: string = req.params.id as string;
    const trackIndex: number = tracks.findIndex((track: TrackBD) => track.id === idTrack);
    if (trackIndex === -1) {
        return res.status(404).json({ message: "Track not found" });
    }

    tracks.splice(trackIndex, 1);

    return res.status(204).json({ message: "Track eliminated" });
});

app.post("/artists", (req: Request, res: Response) => {
    const artist: Artist = req.body;
    if (!isValidArtist(artist)) {
        return res.status(400).json({ message: "Invalid data or country" });
    }

    const idartista: string = randomUUID()
    const artistRecord: ArtistBD = {
        id: idartista,
        artistName: artist.artistName.trim().replace(/\s+/g, " "),
        realName: artist.realName.trim().replace(/\s+/g, " "),
        country: getCanonicalCountry(artist.country)
    };

    artists.push(artistRecord);

    return res.status(201).json(artistRecord);
});

// POST DE COUNTRY
app.post("/countries", (req: Request, res: Response) => {
    const country: Country = req.body;
    if (!isValidCountry(country)) {
        return res.status(400).json({ message: "Invalid country" });
    }

    const uuid: string = randomUUID()

    const countryRecord: CountryBD = {
        id: uuid,
        nom: country.nom.trim().replace(/\s+/g, " "),
    };

    countries.push(countryRecord);

    return res.status(201).json(countryRecord);
});

app.get("/countries", (_req: Request, res: Response) => {
    return res.status(200).json(countries);
});

app.get("/countries/:id", (req: Request, res: Response) => {
    const idCountry: string = req.params.id as string;
    const country: CountryBD | undefined = countries.find(
        (a: CountryBD) => { return a.id === idCountry }
    );
    if (!country) {
        return res.status(404).json({ message: `Country ${idCountry} not found` });
    }
    return res.status(200).json(country);
});


app.listen(port, () => {
    console.log(`Servidor escoltant a ${APICONFIG.host}:${APICONFIG.port}`);
});