import {collide} from "../components/com_collide.js";
import {control_player} from "../components/com_control_player.js";
import {light_point} from "../components/com_light.js";
import {move} from "../components/com_move.js";
import {named} from "../components/com_named.js";
import {render_textured} from "../components/com_render_textured.js";
import {rigid_body} from "../components/com_rigid_body.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_player(game: Game): Blueprint {
    return {
        Using: [
            control_player(true, false),
            move(10, 3),
            collide(true, Layer.Player, Layer.Terrain),
            rigid_body(true),
            named("camera anchor"),
        ],
        Children: [
            {
                // Body.
                Using: [
                    control_player(false, true),
                    render_textured(
                        game.MaterialTextured,
                        game.MeshCube,
                        game.Textures["checker1.png"]
                    ),
                ],
            },
            {
                Translation: [0, 5, 0],
                Using: [light_point([1, 1, 1], 5)],
            },
        ],
    };
}
