import {from_euler} from "../../common/quat.js";
import {float, set_seed} from "../../common/random.js";
import {blueprint_camera_follow} from "../blueprints/blu_camera_follow.js";
import {blueprint_camera_minimap} from "../blueprints/blu_camera_minimap.js";
import {light_directional} from "../components/com_light.js";
import {render_textured_diffuse} from "../components/com_render_textured_diffuse.js";
import {instantiate} from "../core.js";
import {Game} from "../game.js";
import {create_tile, maps} from "../maps.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    game.CurrentScene = scene_stage;
    game.World = new World();
    game.Cameras = [];
    game.MapSize = 11;

    set_seed(Date.now());

    let map = maps[game.LevelNumber];

    game.MapSize = Math.sqrt(map.terrain.length);

    instantiate(game, {
        Scale: [game.MapSize + 2, 1, game.MapSize + 2],
        Translation: [0, 0.099, 0],
        Using: [
            render_textured_diffuse(
                game.MaterialTexturedDiffuse,
                game.MeshPlane,
                game.Textures["404"],
                game.MapSize,
                "water",
                () => Math.sin(Date.now() / 200) / 10
            ),
        ],
    });

    instantiate(game, {
        Scale: [game.MapSize + 5, 1, game.MapSize + 5],
        Translation: [0, 0.098, 0],
        Using: [
            render_textured_diffuse(
                game.MaterialTexturedDiffuse,
                game.MeshPlane,
                game.Textures["404"],
                game.MapSize + 5,
                "water",
                () => Math.sin(Date.now() / 320) / 10
            ),
        ],
    });

    instantiate(game, {
        Scale: [game.MapSize * 10, 1, game.MapSize * 10],
        Translation: [0, 0.097, 0],
        Using: [
            render_textured_diffuse(
                game.MaterialTexturedDiffuse,
                game.MeshPlane,
                game.Textures["404"],
                game.MapSize * 10,
                "water",
                () => Math.sin(Date.now() / 500) / 100
            ),
        ],
    });

    for (let z = 0; z < game.MapSize; z++) {
        for (let x = 0; x < game.MapSize; x++) {
            let index = z * game.MapSize + x;
            let world_x = x - game.MapSize / 2 + 0.5;
            let world_z = z - game.MapSize / 2 + 0.5;

            create_tile(game, map.terrain[index], [world_x, 0, world_z], x, z);
            create_tile(game, map.props[index], [world_x, 1, world_z], x, z);
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

    // Main Camera.
    instantiate(game, {
        ...blueprint_camera_follow(game),
        Translation: [float(-20, 20), float(10, 20), float(10, 20)],
        Rotation: from_euler([0, 0, 0, 0], 0, float(-135, -225), 0),
    });

    // Minimap Camera.
    instantiate(game, {
        Rotation: [0, 1, 0, 0],
        ...blueprint_camera_minimap(game),
    });
}
