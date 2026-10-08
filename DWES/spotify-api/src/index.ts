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
import { createTrack, deleteTrack, getAllTracks, getTrackById, putTrackById } from "./Services/trackService";
import { createArtist, getAllArtists, getArtistById } from "./Services/artistService";
import { ErrorService } from "./interfaces/error/errorService";
import { CreateSuccessService } from "./interfaces/error/createSucessService";
import { UpdateSuccessService } from "./interfaces/error/updateSuccessService";
import { DeleteSuccessService } from "./interfaces/error/deleteSuccessService";
import { error } from "console";


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
    return res.status(200).json(getAllArtists());
});

app.get("/artists/:id", (req: Request, res: Response) => {
    const artist: ArtistBD | undefined = getArtistById(req.params.id as string);

    if (!artist) {
        return res.status(404).json({ message: `Artist not found` });
    }
    return res.status(200).json(artist);
});

app.post("/artists", (req: Request, res: Response) => {

    const result: CreateSuccessService<ArtistBD> | ErrorService = createArtist(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    artists.push((result as CreateSuccessService<ArtistBD>).data);
    return res.status(result.code).json(result);
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
    const result: UpdateSuccessService<TrackBD> | ErrorService = putTrackById(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    const index: number = (result as UpdateSuccessService<TrackBD>).index;
    tracks[index] = (result as UpdateSuccessService<TrackBD>).data;

    return res.status(result.code).json(result);
});

app.delete("/tracks/:id", (req: Request, res: Response) => {

    const result: DeleteSuccessService | ErrorService = deleteTrack(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    const index: number = (result as DeleteSuccessService).index
    tracks.splice(index, 1);

    return res.status(result.code).json(result);
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