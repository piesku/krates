import {from_euler} from "../../common/quat.js";
import {float, set_seed} from "../../common/random.js";
import {blueprint_camera_follow} from "../blueprints/blu_camera_follow.js";
import {control_rotate} from "../components/com_control_rotate.js";
import {light_directional} from "../components/com_light.js";
import {move} from "../components/com_move.js";
import {named} from "../components/com_named.js";
import {instantiate} from "../core.js";
import {Game} from "../game.js";
import {create_tile, maps} from "../maps.js";
import {World} from "../world.js";

export function scene_title(game: Game) {
    game.CurrentScene = scene_title;
    game.World = new World();
    game.Cameras = [];
    game.MapSize = 11;

    set_seed(Date.now());

    let map = maps[0];
    game.MapSize = Math.sqrt(map.terrain.length);

    for (let z = 0; z < game.MapSize; z++) {
        for (let x = 0; x < game.MapSize; x++) {
            let index = z * game.MapSize + x;
            let world_x = x - game.MapSize / 2 + 0.5;
            let world_z = z - game.MapSize / 2 + 0.5;

            create_tile(game, map.terrain[index], [world_x, 0, world_z]);
            create_tile(game, map.props[index], [world_x, 1, world_z]);
        }
    }

    // Directional light.
    instantiate(game, {
        Translation: [1, 1, -1],
        Using: [light_directional([1, 1, 1], 0.8)],
    });
    instantiate(game, {
        Translation: [1, 1, 1],
        Using: [light_directional([1, 1, 1], 0.5)],
    });

    // Camera Anchor
    instantiate(game, {
        Translation: [0, 2, 0],
        Rotation: [0, 1, 0, 0],
        Using: [named("camera anchor"), control_rotate(), move(0, 0.1)],
    });

    // Main Camera.
    instantiate(game, {
        ...blueprint_camera_follow(game, -2),
        Translation: [float(-20, 20), float(10, 20), float(10, 20)],
        Rotation: from_euler([0, 0, 0, 0], 0, float(-135, -225), 0),
    });
}
