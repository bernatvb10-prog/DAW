import { countries } from "../data/country/country";
import { CountryBD } from "../interfaces/country/countryBD";

export function getAllCountries(): CountryBD[] {
    return countries;
}