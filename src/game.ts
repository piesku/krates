import {create_render_buffer, create_texture_rgba} from "../common/texture.js";
import {
    GL_BLEND,
    GL_CULL_FACE,
    GL_DEPTH_TEST,
    GL_ONE,
    GL_ONE_MINUS_SRC_ALPHA,
} from "../common/webgl.js";
import {mat1_postprocess} from "../materials/mat1_postprocess.js";
import {mat1_textured_diffuse} from "../materials/mat1_textured_diffuse.js";
import {mat1_textured_unlit} from "../materials/mat1_textured_unlit.js";
import {mesh_cube} from "../meshes/cube.js";
import {mesh_plane} from "../meshes/plane.js";
import {mesh_quad} from "../meshes/quad.js";
import {mesh_sphere} from "../meshes/sphere.js";
import {Camera} from "./components/com_camera.js";
import {loop_start, loop_stop} from "./core.js";
import {sys_camera} from "./systems/sys_camera.js";
import {sys_collide} from "./systems/sys_collide.js";
import {sys_control_keyboard} from "./systems/sys_control_keyboard.js";
import {sys_control_rotate} from "./systems/sys_control_rotate.js";
import {sys_framerate} from "./systems/sys_framerate.js";
import {sys_light} from "./systems/sys_light.js";
import {sys_mimic} from "./systems/sys_mimic.js";
import {sys_minimap} from "./systems/sys_minimap.js";
import {sys_move} from "./systems/sys_move.js";
import {sys_physics} from "./systems/sys_physics.js";
import {sys_postprocess} from "./systems/sys_postprocess.js";
import {sys_render} from "./systems/sys_render.js";
import {sys_snap} from "./systems/sys_snap.js";
import {sys_transform} from "./systems/sys_transform.js";
import {sys_trigger} from "./systems/sys_trigger.js";
import {sys_ui} from "./systems/sys_ui.js";
import {sys_walk} from "./systems/sys_walk.js";
import {World} from "./world.js";

export type Entity = number;

export class Game {
    World = new World();

    ViewportWidth = 512;
    ViewportHeight = 384;

    InputState: Record<string, number> = {};
    InputDelta: Record<string, number> = {};

    Ui1 = document.querySelector("#scene div")! as HTMLElement;
    Ui2 = document.querySelector("#minimap div")! as HTMLElement;
    CanvasScene = document.querySelector("#scene canvas")! as HTMLCanvasElement;
    Gl = this.CanvasScene.getContext("webgl")!;
    ExtVao = this.Gl.getExtension("OES_vertex_array_object")!;
    CanvasMinimap = document.querySelector("#minimap canvas")! as HTMLCanvasElement;
    ContextMinimap = this.CanvasMinimap.getContext("2d")!;

    MaterialTexturedDiffuse = mat1_textured_diffuse(this.Gl);
    MaterialTexturedUnlit = mat1_textured_unlit(this.Gl);
    MaterialPostprocess = mat1_postprocess(this.Gl);
    MeshCube = mesh_cube(this.Gl);
    MeshPlane = mesh_plane(this.Gl);
    MeshQuad = mesh_quad(this.Gl);
    MeshSphere = mesh_sphere(this.Gl);

    Cameras: Array<Camera> = [];
    // The rendering pipeline supports 8 lights.
    LightPositions = new Float32Array(4 * 8);
    LightDetails = new Float32Array(4 * 8);

    Textures: Record<string, WebGLTexture> = {
        Minimap: create_texture_rgba(this.Gl, 512, 512),
        Postprocess: create_texture_rgba(this.Gl, 128, 128),
    };

    AllTextures: Record<string, string> = {};

    RenderBuffers: Record<string, WebGLRenderbuffer> = {
        Minimap: create_render_buffer(this.Gl, 512, 512),
        Postprocess: create_render_buffer(this.Gl, 128, 128),
    };

    CurrentStage = 0;
    CurrentScene?: Function;
    MapSize = 11;
    UnlockedTextures: string[] = ["portal", "key"]; //, "water", "grass", "stone", "krates"];
    HasKey: boolean = false;
    StageCleared = false;

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
        this.Gl.blendFunc(GL_ONE, GL_ONE_MINUS_SRC_ALPHA);
        this.Gl.enable(GL_BLEND);
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
        sys_control_rotate(this, delta);

        // Game logic.
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
        sys_light(this, delta);
        sys_render(this, delta);
        sys_postprocess(this, delta);
        sys_minimap(this, delta);
        sys_ui(this, delta);
        sys_framerate(this, delta, performance.now() - now);
    }
}
export const enum Layer {
    None = 0,
    Player = 1,
    Terrain = 2,
    Movable = 4,
    Collectable = 8,
    TheThingyThatLetKratesNotToSinkInWater = 16,
}
