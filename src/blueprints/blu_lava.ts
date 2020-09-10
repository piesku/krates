import {render_textured_diffuse} from "../components/com_render_textured_diffuse.js";
import {Blueprint} from "../core.js";
import {Game} from "../game.js";

export function blueprint_lava(game: Game, textured = false): Blueprint {
    let texture = "lava";
    textured = game.UnlockedTextures.includes(texture) ? true : textured;
    return {
        Using: [
            render_textured_diffuse(
                game.MaterialTexturedDiffuse,
                game.MeshCube,
                game.Textures[textured ? texture : "404"],
                [1, 1, 1, 1],
                1,
                texture,
                () => Math.sin(Date.now() / 200) / 10
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
