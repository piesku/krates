import {collide} from "../components/com_collide.js";
import {render_diffuse} from "../components/com_render_diffuse.js";
import {rigid_body} from "../components/com_rigid_body.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_ground(game: Game, size: number): Blueprint {
    return {
        Scale: [size, size, size],
        Using: [
            collide(false, Layer.Terrain, Layer.None),
            rigid_body(false),
            render_diffuse(game.MaterialDiffuseGouraud, game.MeshCube, [1, 1, 0.3, 1]),
        ],
    };
}
