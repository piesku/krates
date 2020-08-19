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
import {DiffuseLayout} from "../../materials/layout_diffuse.js";
import {TexturedLayout} from "../../materials/layout_textured.js";
import {CameraKind} from "../components/com_camera.js";
import {CameraDisplay} from "../components/com_camera_display.js";
import {CameraFramebuffer} from "../components/com_camera_framebuffer.js";
import {RenderKind} from "../components/com_render.js";
import {RenderDiffuse} from "../components/com_render_diffuse.js";
import {RenderTextured} from "../components/com_render_textured.js";
import {Transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform | Has.Render;

export function sys_render(game: Game, delta: number) {
    for (let camera of game.Cameras) {
        switch (camera.Kind) {
            case CameraKind.Display:
                render_display(game, camera);
                break;
            case CameraKind.Framebuffer:
                render_framebuffer(game, camera);
                break;
        }
    }
}

function render_display(game: Game, camera: CameraDisplay) {
    game.Gl.bindFramebuffer(GL_FRAMEBUFFER, null);
    game.Gl.viewport(0, 0, game.ViewportWidth, game.ViewportHeight);
    game.Gl.clearColor(...camera.ClearColor);
    game.Gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    render(game, camera.Pv);
}

function render_framebuffer(game: Game, camera: CameraFramebuffer) {
    game.Gl.bindFramebuffer(GL_FRAMEBUFFER, camera.Target);
    game.Gl.viewport(0, 0, camera.ViewportWidth, camera.ViewportHeight);
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

            if (render.Material !== current_material) {
                current_material = render.Material;
                switch (render.Kind) {
                    case RenderKind.Diffuse:
                        use_diffuse(game, render.Material, pv);
                        break;
                    case RenderKind.Textured:
                        use_textured(game, render.Material, pv);
                        break;
                }
            }

            if (render.FrontFace !== current_front_face) {
                current_front_face = render.FrontFace;
                game.Gl.frontFace(render.FrontFace);
            }

            switch (render.Kind) {
                case RenderKind.Diffuse:
                    draw_diffuse(game, transform, render);
                    break;
                case RenderKind.Textured:
                    // Prevent feedback loop between the active render target
                    // and the texture being rendered.
                    if (render.Texture !== current_target) {
                        draw_textured(game, transform, render);
                    }
                    break;
            }
        }
    }
}

function use_diffuse(game: Game, material: Material<DiffuseLayout>, pv: Mat4) {
    game.Gl.useProgram(material.Program);
    game.Gl.uniformMatrix4fv(material.Locations.Pv, false, pv);
    game.Gl.uniform4fv(material.Locations.LightPositions, game.LightPositions);
    game.Gl.uniform4fv(material.Locations.LightDetails, game.LightDetails);
}

function draw_diffuse(game: Game, transform: Transform, render: RenderDiffuse) {
    game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
    game.Gl.uniformMatrix4fv(render.Material.Locations.Self, false, transform.Self);
    game.Gl.uniform4fv(render.Material.Locations.Color, render.Color);
    game.ExtVao.bindVertexArrayOES(render.Vao);
    game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
    game.ExtVao.bindVertexArrayOES(null);
}

function use_textured(game: Game, material: Material<TexturedLayout>, pv: Mat4) {
    game.Gl.useProgram(material.Program);
    game.Gl.uniformMatrix4fv(material.Locations.Pv, false, pv);
    game.Gl.uniform4fv(material.Locations.LightPositions, game.LightPositions);
    game.Gl.uniform4fv(material.Locations.LightDetails, game.LightDetails);
}

function draw_textured(game: Game, transform: Transform, render: RenderTextured) {
    game.Gl.uniform1f(render.Material.Locations.TexScale, render.TexScale);

    game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
    game.Gl.uniformMatrix4fv(render.Material.Locations.Self, false, transform.Self);
    game.Gl.activeTexture(GL_TEXTURE0);
    game.Gl.bindTexture(GL_TEXTURE_2D, render.Texture);
    game.Gl.uniform1i(render.Material.Locations.Sampler, 0);

    game.ExtVao.bindVertexArrayOES(render.Vao);
    game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
    game.ExtVao.bindVertexArrayOES(null);
}
