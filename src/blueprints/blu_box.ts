import {collide} from "../components/com_collide.js";
import {render_textured} from "../components/com_render_textured.js";
import {rigid_body} from "../components/com_rigid_body.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_box(game: Game): Blueprint {
    return {
        Using: [
            collide(true, Layer.Terrain, Layer.Terrain | Layer.Player, [0.9, 0.9, 0.9]),
            rigid_body(true),
            render_textured(game.MaterialTextured, game.MeshCube, game.Textures["krates.gif"]),
        ],
        Children: [
            {
                Scale: [1.8, 1, 1.8],
                Translation: [0, -0.4, 0],
                Using: [
                    render_textured(
                        game.MaterialTextured,
                        game.MeshPlane,
                        game.Textures["shadow.gif"]
                    ),
                ],
            },
        ],
    };
}
