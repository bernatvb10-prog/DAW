interface Jugador {
    nom: string;
    titular: boolean;
    dorsal: number;
}

interface Equip {
    nom: string;
    jugadors: Jugador[];
}

const equips: Equip[] = [
    {
        nom: "RCD Espanyol",
        jugadors: [
            {
                nom: "Urko",
                titular: true,
                dorsal: 4
            },
            {
                nom: "Roberto Fernández",
                titular: true,
                dorsal: 9
            },
            {
                nom: "Leandro Cabrera",
                titular: false,
                dorsal: 6
            }
        ]
    },
    {
        nom: "Atleti de Madrid",
        jugadors: [
            {
                nom: "Oblak",
                titular: true,
                dorsal: 13
            },
            {
                nom: "Marcos Llorente",
                titular: true,
                dorsal: 14
            },
            {
                nom: "Julian Álvarez",
                titular: false,
                dorsal: 19
            }
        ]
    }
];

function equipTitular(equips: Equip[], nomEquip: string): Jugador[] {
    const equip = equips.find(
        (e: Equip) => e.nom === nomEquip
    );

    if (equip === undefined) {
        return [];
    }

    return equip.jugadors.filter(
        (j: Jugador) => j.titular === true
    );
}

const nomEquip: string = "RCD Espanyol";

const jugadorsTitulars: Jugador[] = equipTitular(equips, nomEquip);

console.log(jugadorsTitulars);