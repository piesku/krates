import {from_euler} from "../../common/quat.js";
import {float, set_seed} from "../../common/random.js";
import {generate_texture} from "../../common/texture.js";
import {blueprint_box} from "../blueprints/blu_box.js";
import {blueprint_camera_follow} from "../blueprints/blu_camera_follow.js";
import {blueprint_ground} from "../blueprints/blu_ground.js";
import {blueprint_player} from "../blueprints/blu_player.js";
import {light_directional} from "../components/com_light.js";
import {instantiate} from "../core.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    game.World = new World();
    game.Camera = undefined;
    game.ViewportResized = true;
    game.Gl.clearColor(0.2, 0.5, 0.9, 1);

    set_seed(Date.now());

    let map_size = 9;
    let tile_size = 2;

    // Ground with holes.
    for (let z = 0; z < map_size; z++) {
        for (let x = 0; x < map_size; x++) {
            if (Math.random() < 0.1) {
                // Lava
                generate_texture(game, [255, 15, 40]).then((texture) => {
                    instantiate(game, {
                        Translation: [
                            tile_size * (x - map_size / 2 + 0.5),
                            -tile_size,
                            tile_size * (z - map_size / 2 + 0.5),
                        ],
                        ...blueprint_ground(game, tile_size, texture),
                    });
                });

                continue;
            }

            generate_texture(game, [110, 215, 40]).then((texture) => {
                instantiate(game, {
                    Translation: [
                        tile_size * (x - map_size / 2 + 0.5),
                        0,
                        tile_size * (z - map_size / 2 + 0.5),
                    ],
                    ...blueprint_ground(game, tile_size, texture),
                });
            });
        }
    }

    // Directional light.
    instantiate(game, {
        Translation: [1, 1, 1],
        Using: [light_directional([1, 1, 1], 0.2)],
    });

    // Player.
    instantiate(game, {
        ...blueprint_player(game),
        Translation: [0, 5, 0],
        Rotation: [0, 1, 0, 0],
    });

    // Camera.
    instantiate(game, {
        ...blueprint_camera_follow(game),
        Translation: [float(-50, 50), float(20, 50), float(20, 50)],
        Rotation: from_euler([0, 0, 0, 0], 0, float(-135, -225), 0),
    });

    // Boxes.

    instantiate(game, {
        ...blueprint_box(game),
        Translation: [2, 10, 2],
    });

    instantiate(game, {
        ...blueprint_box(game),
        Translation: [-2, 20, -2],
    });
}