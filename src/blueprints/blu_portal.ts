import {Action} from "../actions.js";
import {animate, AnimationFlag} from "../components/com_animate.js";
import {collide} from "../components/com_collide.js";
import {render_textured_diffuse} from "../components/com_render_textured_diffuse.js";
import {rigid_body} from "../components/com_rigid_body.js";
import {trigger} from "../components/com_trigger.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_portal(game: Game, textured = false): Blueprint {
    let texture = "portal";
    textured = game.UnlockedTextures.includes(texture) ? true : textured;
    return {
        Children: [
            {
                Translation: [0, -0.3, 0],
                Scale: [1.4, 1.4, 1.4],
                Using: [
                    render_textured_diffuse(
                        game.MaterialTexturedDiffuse,
                        game.MeshCube,
                        game.Textures[textured ? texture : "404"],
                        [1, 1, 1, 1],
                        () => Math.sin(Date.now() / 2000),
                        texture
                    ),
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
            },
            {
                Translation: [0, -1, 0],
                Using: [
                    collide(false, Layer.None, Layer.Player | Layer.Movable, [1, 1, 1]),
                    rigid_body(false),
                    trigger(Action.PortalUsed),
                ],
            },
        ],
    };
}
