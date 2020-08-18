import {collide} from "../components/com_collide.js";
import {render_textured} from "../components/com_render_textured.js";
import {rigid_body} from "../components/com_rigid_body.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_ground(game: Game, size: number, texture: WebGLTexture): Blueprint {
    return {
        Scale: [size, size, size],
        Using: [
            collide(false, Layer.Terrain, Layer.None),
            rigid_body(false),
            render_textured(game.MaterialTextured, game.MeshCube, texture),
        ],
    };
}
