import {collide} from "../components/com_collide.js";
import {render_textured_diffuse} from "../components/com_render_textured_diffuse.js";
import {rigid_body} from "../components/com_rigid_body.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_palm(game: Game, textured = false): Blueprint {
    let texture = "palm";
    textured = game.UnlockedTextures.includes(texture) ? true : textured;
    return {
        Using: [collide(false, Layer.Terrain, Layer.None, [1, 1, 1]), rigid_body(false)],
        Children: [
            {
                Translation: [0, 0.5, -0.5],
                Scale: [0.5, 1, 0.5],
                Using: [
                    render_textured_diffuse(
                        game.MaterialTexturedDiffuse,
                        game.MeshQuad,
                        game.Textures[textured ? texture : "404"],
                        [1, 1, 1, 1],
                        1,
                        texture
                    ),
                ],
            },
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
