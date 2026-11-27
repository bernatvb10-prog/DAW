import { ENV } from "../../Config/env";
import type { ArtistCreate } from "./Interfaces/ArtistCreate";

export async function PostArtist(artist: ArtistCreate) {
    const resposta = await fetch(`${ENV.API_BASE_URL}/artists`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(artist)
    });

    if (!resposta.ok) {
        throw new Error(`Error creating artist (${resposta.status})`);
    }
}
