import {float, integer} from "../../common/random.js";
import {collide} from "../components/com_collide.js";
import {render_textured_diffuse} from "../components/com_render_textured_diffuse.js";
import {rigid_body} from "../components/com_rigid_body.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_small_stone(game: Game, textured = false): Blueprint {
    let texture = "stone";
    textured = game.UnlockedTextures.has(texture) ? true : textured;

    let number_of_stones = integer(4, 10);
    let Children: Blueprint[] = [];

    for (let i = 0; i < number_of_stones; i++) {
        Children.push({
            Scale: [0.5, 0.5 + float(), 0.5],
            Translation: [0.5 - float(), -0.5, 0.5 - float()],
            Using: [
                render_textured_diffuse(
                    game.MaterialTexturedDiffuse,
                    game.MeshCube,
                    game.Textures[textured ? texture : "404"],
                    [1, 1, 1, 1],
                    1,
                    texture
                ),
            ],
        });
    }

    return {
        Using: [collide(false, Layer.Terrain, Layer.None, [0.6, 1, 0.6]), rigid_body(false)],
        Children,
    };
}
