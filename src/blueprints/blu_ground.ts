import {collide} from "../components/com_collide.js";
import {render_textured_diffuse} from "../components/com_render_textured_diffuse.js";
import {rigid_body} from "../components/com_rigid_body.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_ground(game: Game): Blueprint {
    return {
        Using: [
            collide(false, Layer.Terrain, Layer.None),
            rigid_body(false),
            render_textured_diffuse(
                game.MaterialTexturedDiffuse,
                game.MeshCube,
                game.Textures["404"]
            ),
        ],
    };
}
