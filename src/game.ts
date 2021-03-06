import {create_render_buffer, create_texture_rgba} from "../common/texture.js";
import {GL_CULL_FACE, GL_DEPTH_TEST} from "../common/webgl.js";
import {mat1_postprocess} from "../materials/mat1_postprocess.js";
import {mat1_textured_diffuse} from "../materials/mat1_textured_diffuse.js";
import {mesh_cube} from "../meshes/cube.js";
import {mesh_quad} from "../meshes/quad.js";
import {CameraFramebuffer} from "./components/com_camera_framebuffer.js";
import {loop_start, loop_stop} from "./core.js";
import {sys_animate} from "./systems/sys_animate.js";
import {sys_audio} from "./systems/sys_audio.js";
import {sys_camera} from "./systems/sys_camera.js";
import {sys_collide} from "./systems/sys_collide.js";
import {sys_control_keyboard} from "./systems/sys_control_keyboard.js";
import {sys_framerate} from "./systems/sys_framerate.js";
import {sys_mimic} from "./systems/sys_mimic.js";
import {sys_move} from "./systems/sys_move.js";
import {sys_physics} from "./systems/sys_physics.js";
import {sys_postprocess} from "./systems/sys_postprocess.js";
import {RENDER_TEXTURE_SIZE, sys_render} from "./systems/sys_render.js";
import {sys_snap} from "./systems/sys_snap.js";
import {sys_transform} from "./systems/sys_transform.js";
import {sys_trigger} from "./systems/sys_trigger.js";
import {sys_ui} from "./systems/sys_ui.js";
import {sys_walk} from "./systems/sys_walk.js";
import {World} from "./world.js";

export type Entity = number;

export class Game {
    World = new World();

    InputState: Record<string, number> = {};
    InputDelta: Record<string, number> = {};

    Ui = document.querySelector("#ui")! as HTMLElement;
    CanvasScene = document.querySelector("canvas")! as HTMLCanvasElement;
    Gl = this.CanvasScene.getContext("webgl")!;
    ExtVao = this.Gl.getExtension("OES_vertex_array_object")!;
    Audio = new (window["AudioContext"] || window.webkitAudioContext)();

    MaterialTexturedDiffuse = mat1_textured_diffuse(this.Gl);
    MaterialPostprocess = mat1_postprocess(this.Gl);
    MeshCube = mesh_cube(this.Gl);
    MeshQuad = mesh_quad(this.Gl);

    Cameras: Array<CameraFramebuffer> = [];

    Textures: Record<string, WebGLTexture> = {
        Minimap: create_texture_rgba(this.Gl, RENDER_TEXTURE_SIZE, RENDER_TEXTURE_SIZE),
        Postprocess: create_texture_rgba(this.Gl, RENDER_TEXTURE_SIZE, RENDER_TEXTURE_SIZE),
    };

    AllTextures: Record<string, string> = {};

    RenderBuffers: Record<string, WebGLRenderbuffer> = {
        Minimap: create_render_buffer(this.Gl, RENDER_TEXTURE_SIZE, RENDER_TEXTURE_SIZE),
        Postprocess: create_render_buffer(this.Gl, RENDER_TEXTURE_SIZE, RENDER_TEXTURE_SIZE),
    };

    CurrentStage = 0;
    CurrentScene?: Function;
    MapSize = 11;
    UnlockedTextures = new Set();
    HasKey: boolean = false;
    StageCleared = false;
    StageFailed = false;

    constructor() {
        document.addEventListener("visibilitychange", () =>
            document.hidden ? loop_stop() : loop_start(this)
        );

        window.addEventListener("keydown", (evt) => {
            if (!evt.repeat) {
                this.InputState[evt.code] = 1;
                this.InputDelta[evt.code] = 1;
            }
        });
        window.addEventListener("keyup", (evt) => {
            this.InputState[evt.code] = 0;
            this.InputDelta[evt.code] = -1;
        });

        this.Gl.enable(GL_DEPTH_TEST);
        this.Gl.enable(GL_CULL_FACE);
    }

    FrameReset() {
        // Reset event flags for the next frame.
        for (let name in this.InputDelta) {
            this.InputDelta[name] = 0;
        }
    }

    FrameUpdate(delta: number) {
        let now = performance.now();

        // Player input.
        sys_control_keyboard(this, delta);

        // Game logic.
        sys_animate(this, delta);
        sys_walk(this, delta);
        sys_move(this, delta);
        sys_mimic(this, delta);
        sys_transform(this, delta);

        // Collisions and physics.
        sys_collide(this, delta);
        sys_physics(this, delta);
        sys_trigger(this, delta);
        sys_transform(this, delta);

        // Snap to grid.
        sys_snap(this, delta);
        sys_transform(this, delta);

        sys_camera(this, delta);
        sys_render(this, delta);
        sys_postprocess(this, delta);
        sys_ui(this, delta);
        sys_audio(this, delta);
        sys_framerate(this, delta, performance.now() - now);
    }
}
export const enum Layer {
    None = 0,
    Player = 1,
    Terrain = 2,
    Movable = 4,
    Collectable = 8,
}
