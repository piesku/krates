import {RenderDiffuse} from "./com_render_diffuse.js";
import {RenderTextured} from "./com_render_textured.js";

export type Render = RenderDiffuse | RenderTextured;

export const enum RenderKind {
    Diffuse,
    Textured,
}
