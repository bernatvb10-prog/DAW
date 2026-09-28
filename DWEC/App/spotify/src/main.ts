import { tracks } from './data/track';
import type { Track } from './interface/track';
import './style.css';
import { crearCerca } from './view/cerca/cerca';
import { crearTitol } from './view/crearTitol';
import { crearTableSongs } from './view/tableSongs/crearTableSongs';
import { llistaCancons } from './view/tableSongs/llistaCancons';


const appObj: HTMLElement = document.querySelector<HTMLDivElement>('#app')!;
const tbody: HTMLTableSectionElement = document.createElement("tbody");


const cercar: (textABuscar: string) => void = (textABuscar:string) => {
    const llistaTracks: Track[] = tracks.filter(
        (t: Track) => { return t.title.trim().toLowerCase() === textABuscar.toLowerCase() }
    );
    tbody.innerHTML = "";
    llistaCancons(llistaTracks, tbody);
}

appObj.appendChild(crearTitol());
appObj.appendChild(crearCerca(cercar));
appObj.appendChild(crearTableSongs(tbody));


