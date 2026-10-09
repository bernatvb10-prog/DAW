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
import { artistRouter } from "./routes/artistRoutes";
import { getAllCountriesController, getCountryByIdController, postCountryController, putCountryController } from "./controllers/countryController";
import { countryRouter } from "./routes/countryRoutes";


const port: number = 3000;

const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    return res.json(JSON.stringify(APICONFIG));
});

app.use("/tracks", trackRouter);

app.use("/artists", artistRouter);

app.use("/countries", countryRouter);

app.listen(port, () => {
    console.log(`Servidor escoltant a ${APICONFIG.host}:${APICONFIG.port}`);
});