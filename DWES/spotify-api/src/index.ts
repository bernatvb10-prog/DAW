import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { trackRouter } from "./routes/trackRoutes";
import { artistRouter } from "./routes/artistRoutes";
import { countryRouter } from "./routes/countryRoutes";
import { userRouter } from "./routes/userRoutes";


const port: number = 3000;

const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    return res.json(JSON.stringify(APICONFIG));
});

app.use("/tracks", trackRouter);

app.use("/artists", artistRouter);

app.use("/countries", countryRouter);

app.use("/users", userRouter);

app.listen(port, () => {
    console.log(`Servidor escoltant a ${APICONFIG.host}:${APICONFIG.port}`);
});