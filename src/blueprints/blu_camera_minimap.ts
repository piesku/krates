import {from_euler} from "../../common/quat.js";
import {camera_framebuffer_ortho} from "../components/com_camera_framebuffer.js";
import {Blueprint} from "../core.js";
import {Game} from "../game.js";

export function blueprint_camera_minimap(game: Game): Blueprint {
    return {
        Translation: [0, 10, 0],
        Rotation: from_euler([0, 0, 0, 0], -90, 0, 0),
        Using: [
            camera_framebuffer_ortho(
                game.MapSize / 1.333,
                0.1,
                1000,
                game.Textures.Minimap,
                game.RenderBuffers.Minimap,
                512,
                512,
                [0, 0, 1, 1]
            ),
        ],
    };
}
