import {RenderDiffuse} from "./com_render_diffuse.js";
import {RenderTextured} from "./com_render_textured.js";
import {RenderTexturedUnlit} from "./com_render_textured_unlit.js";

export type Render = RenderDiffuse | RenderTextured | RenderTexturedUnlit;

export const enum RenderKind {
    Diffuse,
    Textured,
    TexturedUnlit,
}
