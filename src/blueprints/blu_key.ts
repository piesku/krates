import {from_euler} from "../../common/quat.js";
import {Action} from "../actions.js";
import {animate, AnimationFlag} from "../components/com_animate.js";
import {collide} from "../components/com_collide.js";
import {render_textured_diffuse} from "../components/com_render_textured_diffuse.js";
import {trigger} from "../components/com_trigger.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_key(game: Game, textured = false): Blueprint {
    let texture = "key";
    textured = game.UnlockedTextures.includes(texture) ? true : textured;

    return {
        Scale: [0.7, 0.7, 0.7],
        Using: [
            collide(true, Layer.Collectable, Layer.Player, [0.5, 0.5, 0.5]),
            trigger(Action.KeyCollected),
            animate({
                idle: {
                    Keyframes: [
                        {
                            Timestamp: 0,
                            Rotation: [0, 0, 0, 1],
                        },
                        {
                            Timestamp: 1,
                            Rotation: [0, 1, 0, 0],
                        },
                        {
                            Timestamp: 2,
                            Rotation: [0, 0, 0, -1],
                        },
                    ],
                    Flags: AnimationFlag.Loop,
                },
            }),
        ],
        Children: [
            {
                Rotation: from_euler([0, 0, 0, 1], 90, 0, 0),
                Translation: [0, 0.5, 0],
                Using: [
                    render_textured_diffuse(
                        game.MaterialTexturedDiffuse,
                        game.MeshCube,
                        game.Textures[texture]
                    ),
                ],
            },
            {
                Scale: [0.7, 0.7, 1],
                Translation: [0, -0.4, 0],
                Rotation: [-0.707, 0, 0, 0.707],
                Using: [
                    render_textured_diffuse(
                        game.MaterialTexturedDiffuse,
                        game.MeshQuad,
                        game.Textures["shadow"]
                    ),
                ],
            },
        ],
    };
}
