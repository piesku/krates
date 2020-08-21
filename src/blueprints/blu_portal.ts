import {Action} from "../actions.js";
import {collide} from "../components/com_collide.js";
import {control_rotate} from "../components/com_control_rotate.js";
import {move} from "../components/com_move.js";
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
                    move(0, 3),
                    control_rotate(),
                    render_textured_diffuse(
                        game.MaterialTexturedDiffuse,
                        game.MeshCube,
                        game.Textures[textured ? texture : "404"],
                        () => Math.sin(Date.now() / 2000),
                        texture
                    ),
                ],
            },
            {
                Translation: [0, -1.5, 0],
                Using: [
                    collide(false, Layer.Collectable, Layer.Player | Layer.Movable, [1, 1, 1]),
                    rigid_body(false),
                    trigger(Action.PortalUsed),
                ],
            },
        ],
    };
}
