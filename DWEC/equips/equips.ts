interface Jugador {
    nom: string;
    titular: boolean;
}

interface Equip {
    nom: string;
    jugadors: Jugador[];
}

const equips: Equip[] = [
    {
        nom: "Espanyol",
        jugadors: [
            {
                nom: "Urko",
                titular: true
            },
            {
                nom: "Roberto Fernández",
                titular: true
            },
            {
                nom: "Leandro Cabrera",
                titular: false
            }
        ]
    },
    {
        nom: "Atleti de Madrid",
        jugadors: [
            {
                nom: "Oblak",
                titular: true
            },
            {
                nom: "Marcos Llorente",
                titular: true
            },
            {
                nom: "Julian Álvarez",
                titular: false
            }
        ]
    }
];

