import {Vec3} from "../../common/math.js";
import {from_euler} from "../../common/quat.js";
import {float, set_seed} from "../../common/random.js";
import {blueprint_box} from "../blueprints/blu_box.js";
import {blueprint_camera_follow} from "../blueprints/blu_camera_follow.js";
import {blueprint_camera_minimap} from "../blueprints/blu_camera_minimap.js";
import {blueprint_ground} from "../blueprints/blu_ground.js";
import {blueprint_player} from "../blueprints/blu_player.js";
import {blueprint_texture} from "../blueprints/blu_texture.js";
import {light_directional} from "../components/com_light.js";
import {render_textured_diffuse} from "../components/com_render_textured_diffuse.js";
import {instantiate} from "../core.js";
import {Game} from "../game.js";
import {MapProps} from "../level1.js";
import {World} from "../world.js";

export function scene_stage(game: Game, texture_name: string, level: MapProps[]) {
    game.World = new World();
    game.Cameras = [];
    let level_size = Math.sqrt(level.length);
    game.MapSize = level_size + 2;

    // let map_size_with_fence = game.MapSize + 2;

    set_seed(Date.now());

    instantiate(game, {
        Scale: [game.MapSize, 1, game.MapSize],
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

    // Ground with holes.
    for (let z = 0; z < game.MapSize; z++) {
        for (let x = 0; x < game.MapSize; x++) {
            let ground = blueprint_ground(game);
            if (!(x === 0 || z === 0 || x === game.MapSize - 1 || z === game.MapSize - 1)) {
                instantiate(game, {
                    Translation: [x - game.MapSize / 2 + 0.5, 0, z - game.MapSize / 2 + 0.5],
                    ...blueprint_ground(game),
                });
            }
        }
    }

    for (let z = 0; z < level_size; z++) {
        for (let x = 0; x < level_size; x++) {
            let pos = z * level_size + x;
            let token = level[pos];
            let Translation: Vec3 = [x - level_size / 2 + 0.5, 0, z - level_size / 2 + 0.5];

            switch (token) {
                case MapProps.Krates:
                    // Translation[1] = 10 + ~~(Math.random() * 3);
                    instantiate(game, {
                        Translation,
                        ...blueprint_box(game),
                    });
                    break;
                case MapProps.Texture:
                    Translation[1] = 1;
                    let texture_id = instantiate(game, {
                        ...blueprint_texture(game, texture_name),
                        Translation,
                    });

                    game.AllTextures[texture_id] = texture_name;
                    break;
                case MapProps.SpawnPoint:
                    Translation[1] = 5;
                    console.log(x + 1, z + 1);
                    instantiate(game, {
                        ...blueprint_player(game, x + 1, z + 1),
                        Translation,
                        Rotation: [0, 1, 0, 0],
                    });
                    break;
                // case MapProps.Empty:
                //     instantiate(game, {
                //         Translation,
                //         ...blueprint_ground(game),
                //     });
                //     break;
            }
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
