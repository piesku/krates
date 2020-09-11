import {collide} from "../components/com_collide.js";
import {render_textured_diffuse} from "../components/com_render_textured_diffuse.js";
import {rigid_body} from "../components/com_rigid_body.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_sand(game: Game, textured = false): Blueprint {
    let texture = "sand";
    textured = game.UnlockedTextures.includes(texture) ? true : textured;

    return {
        Using: [
            collide(false, Layer.Terrain, Layer.None, [0.6, 1, 0.6]),
            rigid_body(false),
            render_textured_diffuse(
                game.MaterialTexturedDiffuse,
                game.MeshCube,
                game.Textures[textured ? texture : "404"],
                [1, 1, 1, 1],
                1,
                texture
            ),
        ],
    };
}
