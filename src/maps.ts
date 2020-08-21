import {Vec3} from "../common/math.js";
import {blueprint_box} from "./blueprints/blu_box.js";
import {blueprint_ground} from "./blueprints/blu_ground.js";
import {blueprint_player} from "./blueprints/blu_player.js";
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
];

export function create_tile(game: Game, tile: TileKind, translation: Vec3, x?: number, z?: number) {
    let textured = game.LevelNumber === 0;

    switch (tile) {
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
        case TileKind.SpawnPoint:
            instantiate(game, {
                ...blueprint_player(game, x!, z!),
                Translation: translation,
                Rotation: [0, 1, 0, 0],
            });
            break;
        case TileKind.Texture:
            let texture_name = maps[game.LevelNumber].texture!;
            let texture_id = instantiate(game, {
                ...blueprint_texture(game, texture_name),
                Translation: translation,
            });

            game.AllTextures[texture_id] = texture_name;
    }
}
