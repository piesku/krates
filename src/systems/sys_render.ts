import {Material} from "../../common/material.js";
import {Mat4} from "../../common/math.js";
import {
    GL_COLOR_BUFFER_BIT,
    GL_DEPTH_BUFFER_BIT,
    GL_FRAMEBUFFER,
    GL_TEXTURE0,
    GL_TEXTURE_2D,
    GL_UNSIGNED_SHORT,
} from "../../common/webgl.js";
import {TexturedDiffuseLayout} from "../../materials/layout_textured_diffuse.js";
import {CameraFramebuffer} from "../components/com_camera_framebuffer.js";
import {RenderTexturedDiffuse} from "../components/com_render_textured_diffuse.js";
import {Transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform | Has.Render;
export const RENDER_TEXTURE_SIZE = 128;

export function sys_render(game: Game, delta: number) {
    for (let camera of game.Cameras) {
        render_framebuffer(game, camera);
    }
}

function render_framebuffer(game: Game, camera: CameraFramebuffer) {
    game.Gl.bindFramebuffer(GL_FRAMEBUFFER, camera.Target);
    game.Gl.viewport(0, 0, RENDER_TEXTURE_SIZE, RENDER_TEXTURE_SIZE);
    game.Gl.clearColor(...camera.ClearColor);
    game.Gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    render(game, camera.Pv, camera.RenderTexture);
}

function render(game: Game, pv: Mat4, current_target?: WebGLTexture) {
    // Keep track of the current material to minimize switching.
    let current_material = null;
    let current_front_face = null;

    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            let transform = game.World.Transform[i];
            let render = game.World.Render[i];

            // Prevent feedback loop between the active render target
            // and the texture being rendered.
            if (render.Texture === current_target) {
                continue;
            }

            if (render.Material !== current_material) {
                current_material = render.Material;
                use_textured_diffuse(game, render.Material, pv);
            }

            if (render.FrontFace !== current_front_face) {
                current_front_face = render.FrontFace;
                game.Gl.frontFace(render.FrontFace);
            }

            draw_textured_diffuse(game, transform, render);
        }
    }
}

function use_textured_diffuse(game: Game, material: Material<TexturedDiffuseLayout>, pv: Mat4) {
    game.Gl.useProgram(material.Program);
    game.Gl.uniformMatrix4fv(material.Locations.Pv, false, pv);
    game.Gl.uniform4fv(material.Locations.LightPositions, game.LightPositions);
    game.Gl.uniform4fv(material.Locations.LightDetails, game.LightDetails);
}

function draw_textured_diffuse(game: Game, transform: Transform, render: RenderTexturedDiffuse) {
    game.Gl.uniform1f(
        render.Material.Locations.TexScale,
        typeof render.TexScale === "function" ? render.TexScale() : render.TexScale
    );
    game.Gl.uniform1f(
        render.Material.Locations.TexOffset,
        render.TexOffset ? render.TexOffset() : 0
    );

    game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
    game.Gl.uniformMatrix4fv(render.Material.Locations.Self, false, transform.Self);
    game.Gl.activeTexture(GL_TEXTURE0);
    game.Gl.bindTexture(GL_TEXTURE_2D, render.Texture);
    game.Gl.uniform1i(render.Material.Locations.Sampler, 0);
    game.Gl.uniform4fv(render.Material.Locations.Color, render.Color);

    game.ExtVao.bindVertexArrayOES(render.Vao);
    game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
    game.ExtVao.bindVertexArrayOES(null);
}
