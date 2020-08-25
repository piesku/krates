import {audio_source} from "../components/com_audio_source.js";
import {collide} from "../components/com_collide.js";
import {control_player} from "../components/com_control_player.js";
import {move} from "../components/com_move.js";
import {named} from "../components/com_named.js";
import {render_textured_diffuse} from "../components/com_render_textured_diffuse.js";
import {rigid_body} from "../components/com_rigid_body.js";
import {walk} from "../components/com_walk.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_player(game: Game, grid_x: number, grid_z: number): Blueprint {
    return {
        Using: [
            control_player(),
            walk(grid_x, grid_z),
            move(10, 3),
            collide(true, Layer.Player, Layer.Terrain),
            rigid_body(true),
            named("camera anchor"),
            audio_source(),
        ],
        Children: [
            {
                // Body.
                Scale: [1, 1, 0.5],
                Using: [
                    render_textured_diffuse(
                        game.MaterialTexturedDiffuse,
                        game.MeshSphere,
                        game.Textures["checker1"]
                    ),
                ],
                Children: [
                    // {
                    //     Scale: [1.6, 1, 1.6],
                    //     Translation: [0, -0.31, 0],
                    //     Using: [
                    //         render_textured_diffuse(
                    //             game.MaterialTexturedDiffuse,
                    //             game.MeshPlane,
                    //             game.Textures["shadow"]
                    //         ),
                    //     ],
                    // },
                ],
            },
        ],
    };
}
