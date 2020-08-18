import {from_euler} from "../../common/quat.js";
import {camera} from "../components/com_camera.js";
import {mimic} from "../components/com_mimic.js";
import {find_first} from "../components/com_named.js";
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
                        // camera
                        Translation: [0, 0, 10],
                        Using: [camera(1, 0.1, 1000)],
                    },
                ],
            },
        ],
    };
}
