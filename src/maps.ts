import {Vec3} from "../common/math.js";
import {blueprint_box} from "./blueprints/blu_box.js";
import {blueprint_door} from "./blueprints/blu_door.js";
import {blueprint_empty} from "./blueprints/blu_empty.js";
import {blueprint_ground} from "./blueprints/blu_ground.js";
import {blueprint_key} from "./blueprints/blu_key.js";
import {blueprint_lava} from "./blueprints/blu_lava.js";
import {blueprint_palm} from "./blueprints/blu_palm.js";
import {blueprint_player} from "./blueprints/blu_player.js";
import {blueprint_portal} from "./blueprints/blu_portal.js";
import {blueprint_stone} from "./blueprints/blu_stone.js";
import {blueprint_texture} from "./blueprints/blu_texture.js";
import {named} from "./components/com_named.js";
import {walk} from "./components/com_walk.js";
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
    Door,
    Key,
    Portal,
    PortalDestination,
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
        terrain: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        // prettier-ignore
        props: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        texture: "grass",
        // prettier-ignore
        terrain: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        // prettier-ignore
        props: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        texture: "palm",
        // prettier-ignore
        terrain: [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        // prettier-ignore
        props: [0,0,0,5,0,0,0, 0,0,0,0,0,0,0, 0,0,0,0,0,0,0, 11,0,11,11,11,11,11, 0,0,0,0,0,0,0, 0,0,0,0,0,0,0, 0,0,0,4,0,0,0]
    },
    {
        texture: "stone",
        // prettier-ignore
        terrain: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        // prettier-ignore
        props: [0, 0, 6, 0, 0, 0, 0, 5, 0, 6, 0, 6, 0, 0, 0, 0, 0, 0, 6, 0, 0, 6, 6, 6, 6, 6, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        texture: "krates",
        // prettier-ignore
        terrain: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        // prettier-ignore
        props: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 3, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        texture: "krates",
        // prettier-ignore
        terrain: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        // prettier-ignore
        props: [6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 4, 6, 0, 0, 0, 6, 6, 0, 0, 3, 0, 0, 0, 6, 6, 0, 0, 6, 0, 0, 6, 6, 6, 0, 0, 6, 0, 0, 6, 0, 6, 5, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        texture: "lava",
        // prettier-ignore
        terrain: [2, 2, 2, 2, 2, 2, 1,
            2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 1, 1, 1, 2,
            2, 2, 2, 2, 2, 2, 2],
        // prettier-ignore
        props: [0, 0, 0, 6, 6, 6, 0,
            0, 3, 0, 6, 0, 0, 0,
            0, 0, 0, 6, 3, 6, 0,
            11, 6, 3, 0, 0, 0, 0,
            11, 0, 0, 0, 6, 6, 6,
            11, 0, 4, 0, 0, 0, 5,
            11, 11, 11, 11, 11, 11, 11]
    },
    {
        texture: "lava",
        // prettier-ignore
        terrain: [2, 2, 2, 2, 2, 2, 1, 1,
            2, 2, 2, 2, 2, 2, 1, 2,
            2, 2, 2, 2, 2, 2, 1, 2,
            2, 2, 2, 2, 2, 2, 1, 2,
            2, 2, 2, 2, 2, 2, 1, 1,
            2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // prettier-ignore
        props: [0, 0, 0, 6, 0, 0, 0, 0,
            0, 11, 0, 6, 0, 0, 0, 0,
            0, 0, 0, 0, 3, 0, 0, 5,
            0, 6, 0, 11, 0, 0, 0, 0,
            0, 0, 0, 6, 0, 0, 0, 0,
            6, 11, 6, 11, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        texture: "lava",
        // prettier-ignore
        terrain: [1, 2, 2, 2, 2, 2, 2, 1,
            2, 2, 2, 2, 1, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2, 2,
            1, 2, 2, 2, 2, 2, 2, 1],
        // prettier-ignore
        props: [0, 11, 11, 6, 0, 0, 11, 0,
            11, 0, 0, 6, 0, 0, 0, 0,
            0, 4, 0, 6, 5, 6, 0, 0,
            0, 0, 0, 6, 6, 6, 0, 0,
            0, 0, 0, 3, 0, 6, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            11, 0, 0, 0, 6, 0, 0, 11,
            0, 11, 11, 11, 6, 11, 11, 0]
    },
    {
        texture: "lava",
        // prettier-ignore
        terrain: [1, 2, 2, 2, 2, 2,
            2, 2, 2, 1, 1, 2,
            2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2,
            1, 2, 2, 2, 2, 2],
        // prettier-ignore
        props: [0, 11, 11, 11, 11, 11,
            11, 11, 4, 0, 0, 5,
            6, 0, 3, 3, 11, 11,
            6, 0, 0, 0, 0, 6,
            11, 11, 0, 0, 0, 6,
            0, 11, 11, 11, 11, 11]
    },
    {
        texture: "door",
        // prettier-ignore
        terrain: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        // prettier-ignore
        props: [0, 0, 0, 0, 0, 0, 0, 7, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 6, 5, 6, 6, 6, 6, 0, 6, 6, 0, 0, 0, 0, 0, 6, 8, 0, 6, 6, 6, 6, 6, 0, 0, 3, 0, 0, 0, 0, 4]
    },
    {
        texture: "key",
        // prettier-ignore
        terrain: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        // prettier-ignore
        props: [0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 6, 6, 6, 9, 6, 6, 6, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 4, 0, 0, 0]
    },
    {
        texture: "key",
        // prettier-ignore
        terrain: [2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 1,
            2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 0, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2],
        // prettier-ignore
        props: [0, 0, 0, 0, 0, 0, 0,
            0, 5, 0, 0, 0, 0, 10,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 6, 6, 6, 0, 0,
            6, 6, 6, 9, 6, 6, 6,
            0, 0, 0, 0, 3, 0, 0,
            0, 0, 0, 4, 0, 0, 0]
    },
    {
        texture: "key",
        // prettier-ignore
        terrain: [
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,
            2,1,1,1,1,1,2,
            2,1,1,1,1,1,2,
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2
        ],
        // prettier-ignore
        props: [
            0,0,0,0,0,0,0,
            0,0,0,5,0,0,0,
            6,0,0,0,0,0,6,
            6,0,0,0,0,0,6,
            0,0,0,0,0,0,0,
            0,0,3,4,3,0,0,
            0,0,0,0,0,0,0
        ]
    },
];

export function create_tile(game: Game, tile: TileKind, translation: Vec3, x?: number, z?: number) {
    let textured = game.CurrentStage === 0;

    switch (tile) {
        case TileKind.Lava:
            translation[1] = -0.3;
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
            instantiate(game, {
                ...blueprint_stone(game, textured),
                Translation: translation,
            });
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
        case TileKind.Key:
            instantiate(game, {
                ...blueprint_key(game, textured),
                Translation: translation,
            });
            break;
        case TileKind.Door:
            instantiate(game, {
                ...blueprint_door(game, textured),
                Translation: translation,
            });
            break;
        case TileKind.Palm:
            instantiate(game, {
                ...blueprint_palm(game, textured),
                Translation: translation,
            });
            break;
        case TileKind.Portal:
            translation[1] = 0;
            instantiate(game, {
                ...blueprint_portal(game, textured),
                Translation: translation,
            });
            break;
        case TileKind.PortalDestination:
            translation[1] = 10;
            instantiate(game, {
                Translation: translation,
                Using: [named("destination"), walk(x!, z!)],
            });
            break;
    }
}
