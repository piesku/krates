import {from_euler} from "../../common/quat.js";
import {Action} from "../actions.js";
import {collide} from "../components/com_collide.js";
import {control_rotate} from "../components/com_control_rotate.js";
import {move} from "../components/com_move.js";
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
            move(0, 3),
            control_rotate(),
            trigger(Action.KeyCollected),
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
                Scale: [1.3, 1, 1.3],
                Translation: [0, -0.4, 0],
                Using: [
                    render_textured_diffuse(
                        game.MaterialTexturedDiffuse,
                        game.MeshPlane,
                        game.Textures["shadow"]
                    ),
                ],
            },
        ],
    };
}
