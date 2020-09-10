import {Action} from "../actions.js";
import {collide} from "../components/com_collide.js";
import {render_textured_diffuse} from "../components/com_render_textured_diffuse.js";
import {rigid_body} from "../components/com_rigid_body.js";
import {trigger} from "../components/com_trigger.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_water(
    game: Game,
    textured = game.UnlockedTextures.includes("water")
): Blueprint {
    return {
        Rotation: [-0.707, 0, 0, 0.707],
        Children: [
            {
                Translation: [0, 0, -1.2],
                Scale: [game.MapSize * 100, game.MapSize * 100, 1],
                Using: [
                    collide(false, Layer.Terrain, Layer.Player | Layer.Movable),
                    rigid_body(false),
                    trigger(Action.Drown),
                ],
            },
            {
                Scale: [game.MapSize / 2 + 1, game.MapSize / 2 + 1, 1],
                Translation: [0, 0, 0.03],
                Using: [
                    render_textured_diffuse(
                        game.MaterialTexturedDiffuse,
                        game.MeshQuad,
                        game.Textures[textured ? "water" : "404"],
                        [1, 1, 1, 1],
                        game.MapSize / 2 + 1,
                        "water",
                        () => Math.sin(Date.now() / 200) / 10
                    ),
                ],
            },
            {
                Scale: [game.MapSize / 2 + 2, game.MapSize / 2 + 2, 1],
                Translation: [0, 0, 0.02],
                Using: [
                    render_textured_diffuse(
                        game.MaterialTexturedDiffuse,
                        game.MeshQuad,
                        game.Textures[textured ? "water" : "404"],
                        [1, 1, 1, 1],
                        game.MapSize / 2 + 2,
                        "water",
                        () => Math.sin(Date.now() / 400) / 10
                    ),
                ],
            },
            {
                Scale: [game.MapSize * 10, game.MapSize * 10, 1],
                Translation: [0, 0, 0.01],
                Using: [
                    render_textured_diffuse(
                        game.MaterialTexturedDiffuse,
                        game.MeshQuad,
                        game.Textures[textured ? "water" : "404"],
                        [1, 1, 1, 1],
                        game.MapSize * 10,
                        "water",
                        () => Math.sin(Date.now() / 500) / 20
                    ),
                ],
            },
        ],
    };
}
