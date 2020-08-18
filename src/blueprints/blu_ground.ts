import {float} from "../../common/random.js";
import {collide} from "../components/com_collide.js";
import {render_textured} from "../components/com_render_textured.js";
import {rigid_body} from "../components/com_rigid_body.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_ground(game: Game, size: number): Blueprint {
    return {
        Scale: [size, 1, size],
        Using: [collide(false, Layer.Terrain, Layer.None), rigid_body(false)],
        Children: [
            {
                Translation: [0, float(-0.2, 0.2), 0],
                Using: [
                    render_textured(
                        game.MaterialTextured,
                        game.MeshCube,
                        game.Textures["grass.png"]
                    ),
                ],
            },
        ],
    };
}
