import {ease_in_out_quad} from "../../common/easing.js";
import {from_euler} from "../../common/quat.js";
import {animate} from "../components/com_animate.js";
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
                Children: [
                    {
                        Translation: [0.8, 0.8, 0],
                        Scale: [0.3, 0.3, 0.3],
                        Using: [
                            render_textured_diffuse(
                                game.MaterialTexturedDiffuse,
                                game.MeshCube,
                                game.Textures["hair"]
                            ),
                        ],
                    },
                    {
                        Translation: [-0.8, 0.8, 0],
                        Scale: [0.3, 0.3, 0.3],
                        Using: [
                            render_textured_diffuse(
                                game.MaterialTexturedDiffuse,
                                game.MeshCube,
                                game.Textures["hair"]
                            ),
                        ],
                    },
                    {
                        // BODY + HAIR + EYES
                        Translation: [0, 0.6, 0],
                        Children: [
                            {
                                // HAIR
                                Translation: [0, 0.3, 0],
                                Children: [
                                    {
                                        Translation: [0, 0.3, -0.3],
                                        Scale: [0.4, 0.8, 0.25],
                                        Using: [
                                            render_textured_diffuse(
                                                game.MaterialTexturedDiffuse,
                                                game.MeshCube,
                                                game.Textures["hair"]
                                            ),
                                        ],
                                    },
                                    {
                                        Translation: [0, 0.2, -0.05],
                                        Scale: [0.4, 0.8, 0.25],
                                        Using: [
                                            render_textured_diffuse(
                                                game.MaterialTexturedDiffuse,
                                                game.MeshCube,
                                                game.Textures["hair"]
                                            ),
                                        ],
                                    },
                                    {
                                        Translation: [0, 0.1, 0.2],
                                        Scale: [0.4, 0.8, 0.25],
                                        Using: [
                                            render_textured_diffuse(
                                                game.MaterialTexturedDiffuse,
                                                game.MeshCube,
                                                game.Textures["hair"]
                                            ),
                                        ],
                                    },
                                    {
                                        Translation: [0, 0, 0.44],
                                        Scale: [0.4, 0.8, 0.25],
                                        Using: [
                                            render_textured_diffuse(
                                                game.MaterialTexturedDiffuse,
                                                game.MeshCube,
                                                game.Textures["hair"]
                                            ),
                                        ],
                                    },
                                ],
                            },
                            {
                                Translation: [-0.175, 0, -0.1],
                                Scale: [0.25, 0.6, 1],
                                Using: [
                                    render_textured_diffuse(
                                        game.MaterialTexturedDiffuse,
                                        game.MeshCube,
                                        game.Textures["eye"]
                                    ),
                                ],
                            },
                            {
                                Translation: [0.175, 0, -0.1],
                                Scale: [0.25, 0.6, 1],
                                Using: [
                                    render_textured_diffuse(
                                        game.MaterialTexturedDiffuse,
                                        game.MeshCube,
                                        game.Textures["eye"]
                                    ),
                                ],
                            },
                        ],
                        // Body
                        Using: [
                            render_textured_diffuse(
                                game.MaterialTexturedDiffuse,
                                game.MeshCube,
                                game.Textures["player"]
                            ),
                            animate({
                                // idle: {
                                //     Keyframes: [{Timestamp: 0, Translation: [0, 0, 0]}],
                                // },
                                idle: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: from_euler([0, 0, 0, 0], 0, -15, 0),
                                            Ease: ease_in_out_quad,
                                        },
                                        {
                                            Timestamp: 1,
                                            Rotation: from_euler([0, 0, 0, 0], 0, 15, 0),
                                            Ease: ease_in_out_quad,
                                        },
                                    ],
                                },
                            }),
                        ],
                    },
                ],
            },
        ],
    };
}
