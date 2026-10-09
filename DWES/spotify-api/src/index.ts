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
import { createArtist, deleteArtist, getAllArtists, getArtistById, putArtistById } from "./Services/artistService";
import { ErrorService } from "./interfaces/error/errorService";
import { CreateSuccessService } from "./interfaces/error/createSucessService";
import { UpdateSuccessService } from "./interfaces/error/updateSuccessService";
import { DeleteSuccessService } from "./interfaces/error/deleteSuccessService";
import { error } from "console";
import { createCountry, getAllCountries, getCountryById, putCountryById } from "./Services/countryService";
import { deleteTrackController, getAllTracksController, getTrackByIdController, postTrackController, putTrackController } from "./controllers/tracksController";
import { trackRouter } from "./routes/trackRoutes";
import { deleteArtistController, getAllArtistsController, getArtistByIdController, postArtistController, putArtistController } from "./controllers/artistController";


const port: number = 3000;

const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    return res.json(JSON.stringify(APICONFIG));
});

app.use("/tracks", trackRouter);

app.get("/artists", (_req: Request, res: Response) => {
    return getAllArtistsController(_req, res);
});

app.get("/artists/:id", (req: Request, res: Response) => {
    return getArtistByIdController(req, res);
});

app.post("/artists", (req: Request, res: Response) => {
    return postArtistController(req, res);
});

app.put("/artists/:id", (req: Request, res: Response) => {
    return putArtistController(req, res);
});

app.delete("/artists/:id", (req: Request, res: Response) => {
    return deleteArtistController(req, res);
});

app.get("/countries", (_req: Request, res: Response) => {
    return res.status(200).json(getAllCountries());
});

app.get("/countries/:id", (req: Request, res: Response) => {
    const country: CountryBD | undefined = getCountryById(req.params.id as string);

    if (!country) {
        return res.status(404).json({ message: `Country not found` });
    }
    return res.status(200).json(country);
});

app.post("/countries", (req: Request, res: Response) => {
    const result: CreateSuccessService<CountryBD> | ErrorService = createCountry(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    countries.push((result as CreateSuccessService<CountryBD>).data);
    return res.status(result.code).json(result);
});

app.put("/countries/:id", (req: Request, res: Response) => {
    const result: UpdateSuccessService<CountryBD> | ErrorService = putCountryById(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    const index: number = (result as UpdateSuccessService<CountryBD>).index;
    countries[index] = (result as UpdateSuccessService<CountryBD>).data;

    return res.status(result.code).json(result);
});


app.listen(port, () => {
    console.log(`Servidor escoltant a ${APICONFIG.host}:${APICONFIG.port}`);
});