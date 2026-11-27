import { ENV } from "../../Config/env";

export async function DeletePlaylist(id: string) {
    const resposta = await fetch(
        `${ENV.API_BASE_URL}/playlists/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!resposta.ok) {
        throw new Error(`Error deleting playlist (${resposta.status})`);
    }
}
