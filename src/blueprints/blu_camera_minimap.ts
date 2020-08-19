import {camera_framebuffer} from "../components/com_camera_framebuffer.js";
import {Blueprint} from "../core.js";
import {Game} from "../game.js";

export function blueprint_camera_minimap(game: Game): Blueprint {
    return {
        // 90x, 180y, 0z
        Rotation: [0, 0.707, -0.707, 0],
        Children: [
            {
                Rotation: [0, 1, 0, 0],
                Using: [
                    camera_framebuffer(
                        1,
                        0.1,
                        1000,
                        game.Textures.Minimap,
                        game.RenderBuffers.Minimap,
                        256,
                        256,
                        [0, 0, 1, 1]
                    ),
                ],
            },
        ],
    };
}