import type { Track } from "../interface/track";

function mostrarInfoCanco(track: Track): void {
    console.log(track.id);
}

export function createRowSong(track: Track): HTMLTableRowElement{

    const songtr: HTMLTableRowElement = document.createElement("tr");

    const titleTd: HTMLTableCellElement = document.createElement("td");
    titleTd.textContent = track.title;
    titleTd.addEventListener("click", () => mostrarInfoCanco(track));

    const durationTd: HTMLTableCellElement = document.createElement("td");
    durationTd.textContent = track.duration.toString();
    durationTd.addEventListener("click", () => mostrarInfoCanco(track));

    songtr.appendChild(titleTd);
    songtr.appendChild(durationTd);


    
    return songtr;
}