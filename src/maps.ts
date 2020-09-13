import {Vec3} from "../common/math.js";
import {blueprint_box} from "./blueprints/blu_box.js";
import {blueprint_bush} from "./blueprints/blu_bush.js";
import {blueprint_empty} from "./blueprints/blu_empty.js";
import {blueprint_fence} from "./blueprints/blu_fence.js";
import {blueprint_ground} from "./blueprints/blu_ground.js";
import {blueprint_lava} from "./blueprints/blu_lava.js";
import {blueprint_palm} from "./blueprints/blu_palm.js";
import {blueprint_player} from "./blueprints/blu_player.js";
import {blueprint_sand} from "./blueprints/blu_sand.js";
import {blueprint_shell} from "./blueprints/blu_shell.js";
import {blueprint_small_stone} from "./blueprints/blu_small_stones.js";
import {blueprint_stone} from "./blueprints/blu_stone.js";
import {blueprint_texture} from "./blueprints/blu_texture.js";
import {instantiate} from "./core.js";
import {Game} from "./game.js";

export const enum TileKind {
    Empty,
    Water,
    Grass,
    Krates,
    SpawnPoint,
    Texture,
    Stone,
    Sand,
    Bush,
    Fence,
    Shell,
    Palm,
    Lava,
}

export interface MapData {
    texture?: string;
    terrain: Array<number>;
    props: Array<number>;
}

export let maps: Array<MapData> = [
    {
        terrain: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        props: [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
    },
    {
        texture: "water",
        // prettier-ignore
        terrain: [1, 2, 2, 2, 2, 2, 1,
            1, 2, 2, 2, 2, 2, 1,
            1, 2, 2, 2, 2, 2, 1,
            1, 2, 2, 2, 2, 2, 1,
            1, 2, 2, 2, 2, 2, 1,
            1, 2, 2, 2, 2, 2, 1,
            1, 2, 2, 2, 2, 2, 1],
        // prettier-ignore
        props: [0, 11, 0, 5, 0, 6, 0,
            0, 11, 0, 0, 0, 6, 0,
            0, 6, 0, 0, 0, 6, 0,
            0, 6, 0, 0, 0, 11, 0,
            0, 6, 0, 0, 0, 6, 0,
            0, 11, 0, 0, 0, 6, 0,
            0, 11, 0, 4, 0, 6, 0    ]
    },
    {
        texture: "grass",
        // prettier-ignore
        terrain: [2, 2, 2, 2, 2, 2, 6,
            2, 2, 6, 2, 2, 6, 6,
            2, 6, 2, 2, 6, 6, 2,
            2, 2, 2, 1, 1, 6, 1,
            2, 2, 2, 1, 1, 1, 6,
            2, 2, 2, 1, 1, 1, 1,
            2, 2, 2, 1, 1, 1, 1],
        // prettier-ignore
        props: [11, 11, 11, 0, 0, 0, 5,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 11, 0, 0, 0, 0,
            4, 0, 11, 0, 0, 0, 0]
    },
    {
        texture: "stone",
        // prettier-ignore
        terrain: [2, 2, 2, 7, 7, 2, 2,
            2, 2, 2, 7, 7, 2, 2,
            2, 2, 7, 7, 7, 7, 2,
            2, 7, 7, 7, 2, 2, 2,
            2, 2, 2, 2, 7, 2, 2,
            2, 2, 2, 2, 2, 7, 2,
            2, 2, 2, 2, 2, 2, 2],
        // prettier-ignore
        props: [5, 0, 0, 0, 0, 11, 11,
            0, 0, 0, 0, 0, 0, 0,
            6, 6, 6, 6, 6, 6, 0,
            11, 0, 0, 0, 0, 0, 0,
            0, 0, 6, 6, 6, 6, 6,
            11, 0, 0, 0, 0, 0, 0,
            11, 0, 0, 0, 0, 0, 4]
    },
    {
        texture: "palm",
        // prettier-ignore
        terrain: [7, 7, 7, 7, 1, 1, 1,
            2, 7, 7, 7, 7, 1, 1,
            2, 2, 7, 7, 7, 7, 1,
            2, 2, 2, 7, 7, 7, 7,
            2, 2, 2, 2, 2, 2, 7,
            2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2],
        // prettier-ignore
        props: [0, 0, 0, 0, 0, 0, 0,
            5, 0, 0, 0, 0, 0, 0,
            0, 0, 11, 11, 11, 0, 0,
            0, 11, 11, 0, 0, 0, 0,
            0, 0, 11, 0, 11, 11, 0,
            11, 0, 11, 0, 11, 0, 0,
            0, 0, 0, 0, 11, 0, 4]
    },
    {
        texture: "krates",
        // prettier-ignore
        terrain: [2, 2, 7, 7, 7, 1, 1, 1, 1,
            2, 2, 2, 7, 7, 7, 1, 1, 1,
            2, 2, 2, 2, 7, 7, 7, 1, 1,
            2, 2, 2, 2, 2, 2, 7, 7, 1,
            7, 2, 2, 2, 2, 2, 7, 7, 7,
            7, 7, 2, 2, 2, 2, 2, 2, 7,
            1, 7, 7, 2, 2, 2, 2, 2, 2,
            1, 1, 7, 7, 2, 2, 2, 2, 2,
            1, 1, 1, 7, 7, 2, 2, 2, 2],
        // prettier-ignore
        props: [3, 11, 0, 0, 0, 0, 0, 3, 0,
            0, 11, 0, 0, 0, 0, 0, 0, 0,
            0, 11, 6, 6, 6, 0, 0, 0, 3,
            0, 0, 0, 0, 6, 6, 0, 0, 0,
            4, 0, 0, 0, 0, 6, 0, 0, 0,
            0, 0, 0, 0, 0, 6, 0, 0, 0,
            3, 0, 0, 0, 0, 0, 3, 0, 0,
            0, 0, 0, 0, 0, 0, 6, 5, 0,
            0, 3, 0, 0, 0, 6, 0, 0, 0]
    },
    {
        texture: "sand",
        // prettier-ignore
        terrain: [2, 2, 2, 2, 2, 1, 1, 1,
            2, 2, 2, 2, 2, 7, 7, 1,
            2, 2, 2, 2, 7, 7, 7, 1,
            2, 2, 2, 7, 7, 7, 7, 1,
            1, 1, 1, 7, 7, 7, 7, 1,
            1, 7, 1, 7, 7, 7, 7, 1,
            1, 7, 1, 1, 1, 1, 1, 1,
            1, 7, 7, 1, 1, 1, 1, 1],
        // prettier-ignore
        props: [11, 0, 0, 11, 0, 0, 0, 0,
            0, 0, 4, 6, 0, 0, 0, 0,
            0, 0, 0, 3, 0, 0, 0, 0,
            0, 0, 0, 6, 0, 0, 6, 0,
            0, 0, 0, 6, 0, 0, 10, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 5, 0, 0, 0, 0, 0, 0,
            0, 0, 10, 0, 0, 0, 0, 0]
    },
    {
        texture: "bush",
        // prettier-ignore
        terrain: [2, 2, 2, 2, 7, 7, 1,
            2, 2, 2, 2, 7, 7, 7,
            2, 2, 2, 2, 2, 2, 2,
            7, 2, 2, 2, 2, 2, 2,
            7, 7, 2, 2, 2, 2, 2,
            7, 7, 7, 1, 1, 1, 2,
            7, 7, 7, 7, 7, 7, 7],
        // prettier-ignore
        props: [0, 0, 0, 6, 11, 6, 0,
            0, 3, 0, 8, 0, 0, 0,
            0, 0, 0, 6, 3, 8, 0,
            11, 6, 3, 0, 0, 0, 0,
            6, 0, 0, 0, 11, 11, 6,
            8, 0, 4, 0, 0, 0, 5,
            0, 0, 8, 10, 8, 10, 8]
    },
    {
        texture: "fence",
        // prettier-ignore
        terrain: [
            2, 2, 7, 7, 7, 7, 1, 1,
            2, 2, 2, 7, 7, 7, 1, 2,
            2, 2, 2, 2, 7, 7, 1, 7,
            2, 2, 2, 2, 7, 7, 1, 7,
            2, 2, 2, 2, 2, 7, 1, 7,
            2, 2, 2, 2, 2, 7, 1, 1,
            2, 2, 2, 2, 2, 2, 7, 7,
            0, 0, 0, 0, 0, 0, 0, 0],
        // prettier-ignore
        props: [
            0, 0, 0, 10, 0, 0, 0, 0,
            0, 11, 0, 6, 0, 0, 0, 10,
            0, 0, 0, 0, 3, 0, 0, 0,
            0, 6, 0, 11, 0, 0, 0, 0,
            0, 0, 0, 6, 0, 0, 0, 5,
            8, 9, 9, 9, 4, 0, 0, 0,
            0, 0, 0, 9, 9, 9, 9, 9,
            0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        texture: "lava",
        // prettier-ignore
        terrain: [1, 2, 2, 2, 2, 2, 2, 7, 7, 1, 1,
            2, 2, 2, 2, 1, 2, 2, 2, 7, 7, 1,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 7,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
            1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
            1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1],
        // prettier-ignore
        props: [0, 11, 11, 6, 0, 0, 10, 11, 10, 0, 0,
            11, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 6, 5, 6, 0, 0, 0, 0, 10,
            0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 0,
            0, 0, 0, 6, 12, 12, 12, 6, 0, 0, 0,
            0, 4, 0, 6, 12, 12, 12, 6, 0, 0, 0,
            0, 0, 0, 6, 12, 12, 12, 6, 0, 0, 0,
            0, 0, 0, 6, 6, 6, 12, 6, 0, 0, 0,
            0, 0, 0, 3, 0, 6, 6, 6, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0,
            0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0]
    },
    {
        texture: "shell",
        // prettier-ignore
        terrain: [1, 2, 2, 2, 2, 7,
            2, 2, 2, 1, 1, 7,
            2, 2, 2, 2, 6, 2,
            7, 7, 2, 2, 6, 2,
            7, 7, 7, 2, 2, 2,
            1, 7, 7, 2, 2, 2],
        // prettier-ignore
        props: [0, 10, 11, 10, 9, 9,
            10, 8, 4, 0, 0, 5,
            6, 0, 3, 3, 11, 11,
            6, 0, 0, 0, 0, 6,
            11, 11, 0, 0, 0, 6,
            0, 8, 11, 10, 9, 9]
    },
    {
        texture: "sand",
        // prettier-ignore
        terrain: [
            7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 1,
            7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1,
            2, 1, 1, 1, 1, 1, 2, 2, 7, 7, 7, 7,
            2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 7, 7,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 12,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 12, 12,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 12, 12,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 12, 12, 12,
            7, 7, 2, 2, 2, 2, 2, 2, 12, 12, 12, 12,
            7, 7, 7, 2, 2, 2, 12, 12, 12, 12, 12, 12,
            1, 7, 7, 2, 2, 2, 12, 12, 12, 12, 12, 12
        ],
        // prettier-ignore
        props: [
            0, 0, 0, 5, 0, 0, 0, 0, 11, 11, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            10, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 10,
            8, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 6,
            0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 6, 6,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 12,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 12,
            0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 12,
            0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 12, 12,
            11, 0, 0, 0, 4, 0, 6, 6, 6, 12, 12, 12,
            0, 0, 0, 9, 9, 6, 6, 12, 12, 12, 12, 12
        ]
    },
];

console.log(maps.length);
export function create_tile(game: Game, tile: TileKind, translation: Vec3, x?: number, z?: number) {
    let textured = game.CurrentStage === 0;

    switch (tile) {
        case TileKind.Lava:
            translation[1] -= 0.3;
            instantiate(game, {
                ...blueprint_lava(game, textured),
                Translation: translation,
            });
        // Fall through.
        case TileKind.Water:
            instantiate(game, {
                ...blueprint_empty(),
                Translation: translation,
            });
            break;
        case TileKind.Grass:
            instantiate(game, {
                ...blueprint_ground(game, textured),
                Translation: translation,
            });
            break;
        case TileKind.Krates:
            instantiate(game, {
                ...blueprint_box(game, textured),
                Translation: translation,
            });
            break;
        case TileKind.Stone:
            if (translation[1] === 1) {
                instantiate(game, {
                    ...blueprint_small_stone(game, textured),
                    Translation: translation,
                });
            } else {
                instantiate(game, {
                    ...blueprint_stone(game, textured),
                    Translation: translation,
                });
            }
            break;
        case TileKind.SpawnPoint:
            instantiate(game, {
                ...blueprint_player(game, x!, z!),
                Translation: translation,
                Rotation: [0, 1, 0, 0],
            });
            break;
        case TileKind.Texture:
            let texture_name = maps[game.CurrentStage].texture!;
            let texture_id = instantiate(game, {
                ...blueprint_texture(game, texture_name),
                Translation: translation,
            });

            game.AllTextures[texture_id] = texture_name;
            break;
        case TileKind.Bush:
            instantiate(game, {
                ...blueprint_bush(game, textured),
                Translation: translation,
            });
            break;
        case TileKind.Sand:
            instantiate(game, {
                ...blueprint_sand(game, textured),
                Translation: translation,
            });
            break;
        case TileKind.Palm:
            instantiate(game, {
                ...blueprint_palm(game, textured),
                Translation: translation,
            });
            break;
        case TileKind.Fence:
            instantiate(game, {
                ...blueprint_fence(game, textured),
                Translation: translation,
            });
            break;
        case TileKind.Shell:
            instantiate(game, {
                ...blueprint_shell(game, textured),
                Translation: translation,
            });
            break;
    }
}
