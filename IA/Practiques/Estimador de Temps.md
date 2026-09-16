# Estimador de Temps Enviament

## 1. Primera funció

Primer vaig demanar una funció senzilla per calcular el temps d'enviament segons els productes i el tipus d'enviament.

```typescript
interface Producte {
    nom: string;
    tempsPreparacio: number;
}

function estimarTempsEnviament(
    productes: Producte[],
    tipusEnviament: "express" | "estandard"
): number {

    // L'enviament express té un límit màxim de 48 hores.
    if (tipusEnviament === "express") {
        return 48;
    }

    // En l'enviament estàndard sumem el temps
    // de preparació de tots els productes.
    return productes.reduce(
        (total: number, producte: Producte): number => {
            return total + producte.tempsPreparacio;
        },
        0
    );
}
```

## 2. Millora amb casos especials

Després vaig fer un altre prompt demanant que es revisés la funció tenint en compte possibles errors i casos especials, com ara:

- Comanda sense productes.
- Temps de preparació negatiu.
- Valors `NaN` o `Infinity`.
- Tipus d'enviament incorrecte.

A partir d'això es va fer una versió més segura:

```typescript
interface Producte {
    nom: string;
    tempsPreparacio: number;
}

function estimarTempsEnviamentMillorat(
    productes: Producte[],
    tipusEnviament: "express" | "estandard"
): number {

    // Comprovem que la llista no estigui buida.
    if (productes.length === 0) {
        throw new Error("La comanda ha de tenir almenys un producte.");
    }

    // Comprovem que tots els temps de preparació siguin vàlids.
    for (const producte of productes) {

        // El temps ha de ser un número finit.
        if (!Number.isFinite(producte.tempsPreparacio)) {
            throw new Error(
                `El temps de preparació de "${producte.nom}" no és vàlid.`
            );
        }

        // El temps no pot ser negatiu.
        if (producte.tempsPreparacio < 0) {
            throw new Error(
                `El temps de preparació de "${producte.nom}" no pot ser negatiu.`
            );
        }
    }

    // L'enviament express té un límit màxim de 48 hores.
    if (tipusEnviament === "express") {
        return 48;
    }

    // Per a l'enviament estàndard,
    // sumem el temps de preparació dels productes.
    if (tipusEnviament === "estandard") {
        return productes.reduce(
            (total: number, producte: Producte): number => {
                return total + producte.tempsPreparacio;
            },
            0
        );
    }

    // Aquest cas no hauria de passar gràcies al TypeScript,
    // però deixem l'error per seguretat.
    throw new Error("El tipus d'enviament no és vàlid.");
}
```

## 3. Procediment

Primer vaig demanar una funció bàsica. Després vaig fer un segon prompt demanant que es tinguessin en compte possibles errors i casos especials. Finalment, vaig incorporar aquestes validacions a la funció.

## 4. Anunciat que he copiat

En typescript

una plataforma de venda online vol mostrar a l'usuari quan de temps tardara a rebre la seva comanda

la funcio rebra un llistat dels productes que hi ha en el carro on cada cada producte te un temps estimat de preparacio que dependrà del proveidor

i el tipus de enviament seleccionat (que n'hi ha 2, l'express que será en un temps minim o estándar que rebras la comanda quan l'hagis de rebre, o sigui express te un limit de temps i l'estandar depen dels productes que compris)

tot i que les dades vinguin de una base de dades, podría ser que hi hagues errors de tecleig

necessito que feu:

La primera funcio i despres mes funcions amb millores

un breu comentari/justificacio al codi on s'expliquin les decisions preses davant dels casos ambigús o dades incoherents

procediment que s'ha seguit per arribar a la conclusio final (una mica com hem interactuat amb la ia)

el fitxer s'ha de dir: Estimador de Temps Enviament.md i posant el codi amb ```typescript ```