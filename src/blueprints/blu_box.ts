import {collide} from "../components/com_collide.js";
import {render_diffuse} from "../components/com_render_diffuse.js";
import {rigid_body} from "../components/com_rigid_body.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_box(game: Game): Blueprint {
    return {
        Scale: [0.9, 0.9, 0.9],
        Using: [
            collide(true, Layer.Terrain, Layer.Terrain | Layer.Player),
            rigid_body(true),
            render_diffuse(game.MaterialDiffuseGouraud, game.MeshCube, [1, 1, 0.3, 1]),
        ],
    };
}
