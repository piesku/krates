export const enum TileKind {
    Empty,
    Water,
    Grass,
    Krates,
}

interface MapData {
    terrain: Array<number>;
    props: Array<number>;
}

export let maps: Array<MapData> = [
    {
        terrain: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        props: [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
    },
];
