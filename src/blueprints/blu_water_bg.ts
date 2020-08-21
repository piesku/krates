import {render_textured_diffuse} from "../components/com_render_textured_diffuse.js";
import {Blueprint} from "../core.js";
import {Game} from "../game.js";

export function blueprint_water(game: Game): Blueprint {
    let texture = "water";
    let textured = game.UnlockedTextures.includes(texture);

    return {
        Children: [
            {
                Scale: [game.MapSize + 2, 1, game.MapSize + 2],
                Translation: [0, 0.099, 0],
                Using: [
                    render_textured_diffuse(
                        game.MaterialTexturedDiffuse,
                        game.MeshPlane,
                        game.Textures[textured ? texture : "404"],
                        game.MapSize,
                        "water",
                        () => Math.sin(Date.now() / 200) / 10
                    ),
                ],
            },

            {
                Scale: [game.MapSize + 5, 1, game.MapSize + 5],
                Translation: [0, 0.098, 0],
                Using: [
                    render_textured_diffuse(
                        game.MaterialTexturedDiffuse,
                        game.MeshPlane,
                        game.Textures[textured ? texture : "404"],
                        game.MapSize + 5,
                        "water",
                        () => Math.sin(Date.now() / 320) / 10
                    ),
                ],
            },
            {
                Scale: [game.MapSize * 10, 1, game.MapSize * 10],
                Translation: [0, 0.097, 0],
                Using: [
                    render_textured_diffuse(
                        game.MaterialTexturedDiffuse,
                        game.MeshPlane,
                        game.Textures[textured ? texture : "404"],
                        game.MapSize * 10,
                        "water",
                        () => Math.sin(Date.now() / 500) / 100
                    ),
                ],
            },
        ],
    };
}
