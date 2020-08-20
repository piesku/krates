import {from_euler} from "../../common/quat.js";
import {Action} from "../actions.js";
import {collide} from "../components/com_collide.js";
import {control_rotate} from "../components/com_control_rotate.js";
import {move} from "../components/com_move.js";
import {render_textured_diffuse} from "../components/com_render_textured_diffuse.js";
import {trigger} from "../components/com_trigger.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_texture(game: Game): Blueprint {
    return {
        Scale: [0.5, 0.5, 0.5],
        Using: [
            collide(true, Layer.Terrain, Layer.Terrain | Layer.Player, [0.5, 0.5, 0.5]),
            move(0, 3),
            control_rotate(),
            trigger(Action.TextureCollected),
        ],
        Children: [
            {
                Translation: [0, 1, 0],
                Rotation: from_euler([0, 0, 0, 0], 45, 45, 0),
                Using: [
                    render_textured_diffuse(
                        game.MaterialTexturedDiffuse,
                        game.MeshCube,
                        game.Textures["grass"]
                    ),
                ],
            },
            {
                Rotation: from_euler([0, 0, 0, 0], 0, 45, 0),
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
