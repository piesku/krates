import {ease_in_out_quad} from "../../common/easing.js";
import {Vec4} from "../../common/math.js";
import {from_euler} from "../../common/quat.js";
import {animate, AnimationFlag} from "../components/com_animate.js";
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

let color_hair: Vec4 = [1, 0, 1, 1];
let color_body: Vec4 = [1, 1, 0, 1];
let color_eyes: Vec4 = [0.1, 0.1, 0.1, 1];
let color_dziup: Vec4 = [1, 0.56, 0, 1];

export function blueprint_player(game: Game, grid_x: number, grid_z: number): Blueprint {
    return {
        // Scale: [0.7, 1, 0.7],
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
                        // Hand
                        Translation: [0.7, 0.6, 0],
                        Scale: [0.2, 0.6, 0.5],
                        Using: [
                            render_textured_diffuse(
                                game.MaterialTexturedDiffuse,
                                game.MeshCube,
                                game.Textures["plain"],
                                color_hair
                            ),
                            animate({
                                idle: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: from_euler([0, 0, 0, 0], 0, 0, 0),
                                        },
                                        {
                                            Timestamp: 1,
                                            Rotation: from_euler([0, 0, 0, 0], 0, 0, 45),
                                        },
                                    ],
                                },
                                walk: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: from_euler([0, 0, 0, 0], 45, 0, 0),
                                        },
                                        {
                                            Timestamp: 0.2,
                                            Rotation: from_euler([0, 0, 0, 0], -45, 0, 0),
                                        },
                                    ],
                                },
                                float: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Translation: [0.7, 0.8, 0],
                                            Rotation: from_euler([0, 0, 0, 0], 0, 0, 180),
                                        },
                                        {
                                            Timestamp: 0.2,
                                            Translation: [0.7, 0.8, 0],
                                            Rotation: from_euler([0, 0, 0, 0], 0, 0, 45),
                                        },
                                    ],
                                    Flags: AnimationFlag.Loop,
                                },
                            }),
                        ],
                    },
                    {
                        // Hand
                        Translation: [-0.7, 0.6, 0],
                        Scale: [0.2, 0.6, 0.5],
                        Using: [
                            render_textured_diffuse(
                                game.MaterialTexturedDiffuse,
                                game.MeshCube,
                                game.Textures["plain"],
                                color_hair
                            ),
                            animate({
                                idle: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: from_euler([0, 0, 0, 0], 0, 0, -45),
                                        },
                                        {
                                            Timestamp: 1,
                                            Rotation: from_euler([0, 0, 0, 0], 0, 0, 0),
                                        },
                                    ],
                                },
                                walk: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: from_euler([0, 0, 0, 0], -45, 0, 0),
                                        },
                                        {
                                            Timestamp: 0.2,
                                            Rotation: from_euler([0, 0, 0, 0], 45, 0, 0),
                                        },
                                    ],
                                },
                                float: {
                                    Flags: AnimationFlag.Loop,
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Translation: [-0.7, 0.8, 0],
                                            Rotation: from_euler([0, 0, 0, 0], 0, 0, -180),
                                        },
                                        {
                                            Timestamp: 0.2,
                                            Translation: [-0.7, 0.7, 0],
                                            Rotation: from_euler([0, 0, 0, 0], 0, 0, -45),
                                        },
                                    ],
                                },
                            }),
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
                                                game.Textures["plain"],
                                                color_hair
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
                                                game.Textures["plain"],
                                                color_hair
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
                                                game.Textures["plain"],
                                                color_hair
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
                                                game.Textures["plain"],
                                                color_hair
                                            ),
                                        ],
                                    },
                                ],
                            },
                            {
                                Translation: [-0.175, 0.3, -0.2],
                                Scale: [0.25, 0.3, 1],
                                Using: [
                                    render_textured_diffuse(
                                        game.MaterialTexturedDiffuse,
                                        game.MeshCube,
                                        game.Textures["plain"],
                                        color_eyes
                                    ),
                                ],
                            },
                            {
                                Translation: [0.175, 0.3, -0.2],
                                Scale: [0.25, 0.3, 1],
                                Using: [
                                    render_textured_diffuse(
                                        game.MaterialTexturedDiffuse,
                                        game.MeshCube,
                                        game.Textures["plain"],
                                        color_eyes
                                    ),
                                ],
                            },
                            {
                                Translation: [0, -0.2, -0.5],
                                Scale: [0.25, 0.5, 0.8],
                                Rotation: from_euler([0, 0, 0, 0], 45, 0, 0),
                                Using: [
                                    render_textured_diffuse(
                                        game.MaterialTexturedDiffuse,
                                        game.MeshCube,
                                        game.Textures["plain"],
                                        color_dziup
                                    ),
                                ],
                            },
                            {
                                // Body
                                // Scale: [1.5, 1.5, 1.5],
                                Using: [
                                    render_textured_diffuse(
                                        game.MaterialTexturedDiffuse,
                                        game.MeshCube,
                                        game.Textures["plain"],
                                        color_body
                                    ),
                                ],
                            },
                        ],
                        Using: [
                            animate({
                                // idle: {
                                //     Keyframes: [{Timestamp: 0, Translation: [0, 0, 0]}],
                                // },
                                idle: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: from_euler([0, 0, 0, 0], 0, 0, -10),
                                            Ease: ease_in_out_quad,
                                        },
                                        {
                                            Timestamp: 1,
                                            Rotation: from_euler([0, 0, 0, 0], 0, 0, 10),
                                            Ease: ease_in_out_quad,
                                        },
                                    ],
                                },
                                walk: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: from_euler([0, 0, 0, 0], 0, -15, 0),
                                        },
                                        {
                                            Timestamp: 0.2,
                                            Rotation: from_euler([0, 0, 0, 0], 0, 15, 0),
                                        },
                                    ],
                                },
                                float: {
                                    Flags: AnimationFlag.Loop,
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: from_euler([0, 0, 0, 0], -15, 0, 0),
                                        },
                                        {
                                            Timestamp: 0.2,
                                            Rotation: from_euler([0, 0, 0, 0], 15, 0, 0),
                                        },
                                    ],
                                },
                            }),
                        ],
                    },
                ],
            },
            {
                // Shadow
                Rotation: from_euler([0, 0, 0, 0], -90, 0, 0),
                Scale: [0.6, 0.6, 1],
                Translation: [0, -0.49, 0],
                Using: [
                    render_textured_diffuse(
                        game.MaterialTexturedDiffuse,
                        game.MeshQuad,
                        game.Textures["shadow"]
                    ),
                    animate({
                        idle: {Keyframes: [{Timestamp: 0, Translation: [0, 0, 0]}]},
                        walk: {
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                    Rotation: from_euler([0, 0, 0, 0], -90, -15, 0),
                                },
                                {
                                    Timestamp: 0.2,
                                    Rotation: from_euler([0, 0, 0, 0], -90, 15, 0),
                                },
                            ],
                        },
                    }),
                ],
            },
        ],
    };
}
