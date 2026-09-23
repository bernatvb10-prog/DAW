interface Canco{
    id: string;
    titol: string;
    artista: string;
    durada: number;
}

interface Track{
    title: string;
    duration: number;
}

const cancons: Canco[] = [
    {
        id: "2B-CA",
        titol: "Rattle and Hum",
        artista: "U2",
        durada: 30
    },
    {
        id: "2B-CX",
        titol: "Rattle and Hum",
        artista: "U2",
        durada: 65
    },
    {
        id: "3B-TX",
        titol: "Chicago",
        artista: "Michael Jackson",
        durada: 190
    },
    {
        id: "3B-TXY",
        titol: "Chicago",
        artista: "Michael Jackson",
        durada: 180
    },
]

const songsString: string[] = cancons.map(
    (c: Canco) => {
        let text: string = `${c.titol} (${c.artista} - durada: ${c.durada})`;
        return text.trim();
    }
)

const tracks: Track[] = cancons.map(
    (c: Canco) => {
        return {title: c.titol, duration: c.durada}
    }
)

tracks.forEach(
    (t: Track) => { console.log(t); }
);