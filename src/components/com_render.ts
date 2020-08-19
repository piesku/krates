import {RenderTextured} from "./com_render_textured.js";
import {RenderTexturedUnlit} from "./com_render_textured_unlit.js";

export type Render = RenderTextured | RenderTexturedUnlit;

export const enum RenderKind {
    Textured,
    TexturedUnlit,
}
