import {ease_in_out_quad} from "../../common/easing.js";
import {animate} from "../components/com_animate.js";
import {collide} from "../components/com_collide.js";
import {render_textured_diffuse} from "../components/com_render_textured_diffuse.js";
import {rigid_body} from "../components/com_rigid_body.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_box(game: Game, textured = false): Blueprint {
    let texture = "krates";
    textured = game.UnlockedTextures.includes(texture) ? true : textured;

    return {
        Using: [
            collide(true, Layer.Movable, Layer.Terrain | Layer.Movable | Layer.Player),
            rigid_body(true),
        ],
        Children: [
            {
                Using: [
                    render_textured_diffuse(
                        game.MaterialTexturedDiffuse,
                        game.MeshCube,
                        game.Textures[textured ? texture : "404"],
                        [1, 1, 1, 1],
                        1,
                        texture
                    ),
                    animate({
                        idle: {
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                    Rotation: [0, 0, 0, 1],
                                },
                            ],
                        },
                        float: {
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                    Translation: [0, 0, 0],
                                    Ease: ease_in_out_quad,
                                },
                                {
                                    Timestamp: 1,
                                    Translation: [0, -0.2, 0],
                                    Ease: ease_in_out_quad,
                                },
                            ],
                        },
                    }),
                ],
            },
            {
                Using: [collide(true, Layer.Terrain, Layer.None, [0.1, 1, 0.1]), rigid_body(false)],
            },
            // {
            //     Scale: [1.8, 1, 1.8],
            //     Translation: [0, -0.4, 0],
            //     Using: [
            //         render_textured_diffuse(
            //             game.MaterialTexturedDiffuse,
            //             game.MeshPlane,
            //             game.Textures["shadow"]
            //         ),
            //     ],
            // },
        ],
    };
}
