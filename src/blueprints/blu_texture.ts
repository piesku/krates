import {from_euler} from "../../common/quat.js";
import {render_textured_diffuse} from "../components/com_render_textured_diffuse.js";
import {Blueprint} from "../core.js";
import {Game} from "../game.js";

export function blueprint_texture(game: Game): Blueprint {
    return {
        Scale: [0.5, 0.5, 0.5],
        Using: [],
        Children: [
            {
                Translation: [0, 1, 0],
                Rotation: from_euler([0, 0, 0, 0], 45, 45, 45),
                Using: [
                    render_textured_diffuse(
                        game.MaterialTexturedDiffuse,
                        game.MeshCube,
                        game.Textures["grass"]
                    ),
                ],
            },
            {
                Rotation: from_euler([0, 0, 0, 0], 0, 45, 0),
                Scale: [1.8, 1, 1.8],
                Translation: [0, -0.4, 0],
                Using: [
                    render_textured_diffuse(
                        game.MaterialTexturedDiffuse,
                        game.MeshPlane,
                        game.Textures["shadow"]
                    ),
                ],
            },
        ],
    };
}
