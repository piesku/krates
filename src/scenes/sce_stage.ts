import {from_euler} from "../../common/quat.js";
import {float, set_seed} from "../../common/random.js";
import {blueprint_camera_follow} from "../blueprints/blu_camera_follow.js";
import {blueprint_camera_minimap} from "../blueprints/blu_camera_minimap.js";
import {blueprint_water} from "../blueprints/blu_water_bg.js";
import {instantiate} from "../core.js";
import {Game} from "../game.js";
import {create_tile, maps} from "../maps.js";
import {World} from "../world.js";

export function scene_stage(game: Game, stage_index: number) {
    game.CurrentScene = scene_stage;
    game.CurrentStage = stage_index;
    game.StageCleared = false;
    game.StageFailed = false;
    game.World = new World();
    game.Cameras = [];

    set_seed(Date.now());

    let map = maps[game.CurrentStage];
    game.MapSize = Math.sqrt(map.terrain.length);

    instantiate(game, blueprint_water(game));

    for (let z = 0; z < game.MapSize; z++) {
        for (let x = 0; x < game.MapSize; x++) {
            let index = z * game.MapSize + x;
            let world_x = x - game.MapSize / 2 + 0.5;
            let world_z = z - game.MapSize / 2 + 0.5;

            create_tile(game, map.terrain[index], [world_x, 0, world_z], x, z);
            create_tile(game, map.props[index], [world_x, 1, world_z], x, z);
        }
    }

    // Main Camera.
    instantiate(game, {
        ...blueprint_camera_follow(game, 0),
        Translation: [float(-20, 20), float(10, 20), float(10, 20)],
        Rotation: from_euler([0, 0, 0, 0], 0, float(-135, -225), 0),
    });

    // Minimap Camera.
    instantiate(game, {
        Rotation: [0, 1, 0, 0],
        ...blueprint_camera_minimap(game),
    });
}
