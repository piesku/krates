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
    let image = new ImageData(512, 384);
    game.Gl.bindFramebuffer(GL_FRAMEBUFFER, camera.Target);
    game.Gl.readPixels(0, 64, 512, 384, GL_RGBA, GL_DATA_UNSIGNED_BYTE, image.data);

    game.ContextMinimap.putImageData(image, 0, 0);
    game.ContextMinimap.scale(1, -1);
    game.ContextMinimap.translate(0, -384);
    game.ContextMinimap.drawImage(game.CanvasMinimap, 0, 0);
    game.ContextMinimap.resetTransform();
}
