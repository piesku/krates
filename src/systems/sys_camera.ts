import {multiply} from "../../common/mat4.js";
import {CameraFramebuffer} from "../components/com_camera_framebuffer.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform | Has.Camera;

export function sys_camera(game: Game, delta: number) {
    game.Cameras = [];
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            let camera = game.World.Camera[i];

            update_framebuffer(game, i, camera);
            game.Cameras.push(camera);
        }
    }
}

function update_framebuffer(game: Game, entity: Entity, camera: CameraFramebuffer) {
    let transform = game.World.Transform[entity];
    multiply(camera.Pv, camera.Projection, transform.Self);
}
