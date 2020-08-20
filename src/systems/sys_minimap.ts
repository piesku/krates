import {GL_DATA_UNSIGNED_BYTE, GL_FRAMEBUFFER, GL_RGBA} from "../../common/webgl.js";
import {CameraKind} from "../components/com_camera.js";
import {CameraFramebuffer} from "../components/com_camera_framebuffer.js";
import {Game} from "../game.js";

export function sys_minimap(game: Game, delta: number) {
    for (let camera of game.Cameras) {
        if (
            camera.Kind === CameraKind.Framebuffer &&
            camera.RenderTexture === game.Textures.Minimap
        ) {
            render_minimap(game, camera);
            break;
        }
    }
}

function render_minimap(game: Game, camera: CameraFramebuffer) {
    let data = new Uint8ClampedArray(camera.ViewportWidth * camera.ViewportHeight * 4);
    game.Gl.bindFramebuffer(GL_FRAMEBUFFER, camera.Target);
    game.Gl.readPixels(
        0,
        0,
        camera.ViewportWidth,
        camera.ViewportHeight,
        GL_RGBA,
        GL_DATA_UNSIGNED_BYTE,
        data
    );
    game.ContextMinimap.putImageData(
        new ImageData(data, camera.ViewportWidth, camera.ViewportHeight),
        0,
        0
    );
}
