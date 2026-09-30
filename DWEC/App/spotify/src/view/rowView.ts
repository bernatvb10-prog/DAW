import type { Track } from "../interface/track";

export function createRowSong(track: Track, mostrarInfoCanço: (track: Track) => void): HTMLTableRowElement {

    const songtr: HTMLTableRowElement = document.createElement("tr");

    const titleTd: HTMLTableCellElement = document.createElement("td");
    titleTd.textContent = track.title;
    titleTd.addEventListener("click", () => mostrarInfoCanço(track));

    const durationTd: HTMLTableCellElement = document.createElement("td");
    durationTd.textContent = track.duration.toString();
    durationTd.addEventListener("click", () => mostrarInfoCanço(track));

    songtr.appendChild(titleTd);
    songtr.appendChild(durationTd);



    return songtr;
}