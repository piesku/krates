import {from_euler} from "../../common/quat.js";
import {camera_framebuffer} from "../components/com_camera_framebuffer.js";
import {mimic} from "../components/com_mimic.js";
import {find_first} from "../components/com_named.js";
import {render_textured_unlit} from "../components/com_render_textured_unlit.js";
import {Blueprint} from "../core.js";
import {Game} from "../game.js";

export function blueprint_camera_follow(game: Game): Blueprint {
    return {
        Using: [mimic(find_first(game.World, "camera anchor"), 0.03)],
        Children: [
            {
                Rotation: from_euler([0, 0, 0, 0], -45, 180, 0),
                Children: [
                    {
                        // Camera
                        Translation: [0, 0, 5],
                        Using: [
                            camera_framebuffer(
                                1,
                                0.1,
                                1000,
                                game.Textures.Postprocess,
                                game.RenderBuffers.Postprocess,
                                128,
                                128,
                                [0.2, 0.5, 0.9, 1]
                            ),
                            //camera_display(1, 0.1, 1000, [0.2, 0.5, 0.9, 1]),
                        ],
                    },
                    {
                        // Minimap Plane.
                        Translation: [0.5, -0.5, 2],
                        Rotation: [0.707, 0, 0, 0.707],
                        Using: [
                            render_textured_unlit(
                                game.MaterialTexturedUnlit,
                                game.MeshPlane,
                                game.Textures.Minimap
                            ),
                        ],
                    },
                ],
            },
        ],
    };
}
