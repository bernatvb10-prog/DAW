import { useEffect, useState, type SubmitEvent } from "react";
import type { ArtistCreate } from "../../APIManagement/Artists/Interfaces/ArtistCreate";
import { ENV } from "../../Config/env";
import type { AddArtistFormProps } from "./Types/AddArtistFormProps";

interface GETCountry {
    id: string;
    nom: string;
}

const AddArtistForm = ({ submit }: AddArtistFormProps) => {
    const [countries, setCountries] = useState<GETCountry[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function carregarCountries() {
            const resposta = await fetch(`${ENV.API_BASE_URL}/countries`);
            if (!resposta.ok) {
                throw new Error(`Error carregant països (${resposta.status})`);
            }

            const listCountries: GETCountry[] = await resposta.json() as GETCountry[];
            setCountries(listCountries);
        }

        carregarCountries().catch((loadError: unknown) => {
            setError(loadError instanceof Error ? loadError.message : "Error carregant països");
        });
    }, []);

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const dades = new FormData(event.currentTarget);
        const artist: ArtistCreate = {
            artistName: String(dades.get("artistName") ?? "").trim(),
            realName: String(dades.get("realName") ?? "").trim(),
            country: String(dades.get("country") ?? "")
        };

        setError(null);
        try {
            await submit(artist);
        } catch (submitError) {
            setError(
                submitError instanceof Error
                    ? submitError.message
                    : "Error creant l'artista"
            );
        }
    }

    return (
        <>
            <h1>Afegir artista</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>
                        Nom artístic:
                        <input type="text" name="artistName" required />
                    </label>
                </p>
                <p>
                    <label>
                        Nom real:
                        <input type="text" name="realName" required />
                    </label>
                </p>
                <p>
                    <label>
                        País:
                        <select name="country" required disabled={countries.length === 0}>
                            <option value="">Selecciona un país</option>
                            {countries.map((country) => (
                                <option key={country.id} value={country.id}>
                                    {country.nom}
                                </option>
                            ))}
                        </select>
                    </label>
                </p>
                {error && <p role="alert">{error}</p>}
                <button type="submit" disabled={countries.length === 0}>
                    Desa
                </button>
            </form>
        </>
    );
}

export default AddArtistForm;
