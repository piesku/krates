import {collide} from "../components/com_collide.js";
import {render_textured_diffuse} from "../components/com_render_textured_diffuse.js";
import {rigid_body} from "../components/com_rigid_body.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_stone(game: Game, textured = false): Blueprint {
    let texture = "stone";
    textured = game.UnlockedTextures.has(texture) ? true : textured;
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
        Children: [
            // {
            //     Scale: [1.8, 1, 1.8],
            //     Translation: [0, -0.4, 0],
            //     Using: [
            //         render_textured_diffuse(
            //             game.MaterialTexturedDiffuse,
            //             game.MeshPlane,
            //             game.Textures["shadow"]
            //         ),
            //     ],
            // },
        ],
    };
}
