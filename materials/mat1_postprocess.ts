import {link, Material} from "../common/material.js";
import {GL_TRIANGLES} from "../common/webgl.js";
import {PostprocessLayout} from "./layout_postprocess.js";

let vertex = `
    attribute vec3 position;
    attribute vec2 texcoord;
    varying vec2 vert_texcoord;

    void main() {
        gl_Position = vec4(position, 1.0);
        vert_texcoord = texcoord;
    }
`;

let fragment = `
    precision mediump float;

    uniform sampler2D sampler;
    uniform float aspect;

    varying vec2 vert_texcoord;

    void main() {
        if (aspect > 1.0) {
            vec2 uv = vec2(vert_texcoord.x, vert_texcoord.y / aspect + (1.0 - 1.0 / aspect));
            gl_FragColor = texture2D(sampler, uv);
        } else {
            vec2 uv = vec2(vert_texcoord.x * aspect + (1.0 - aspect), vert_texcoord.y);
            gl_FragColor = texture2D(sampler, uv);
        }
    }
`;

export function mat1_postprocess(gl: WebGLRenderingContext): Material<PostprocessLayout> {
    let program = link(gl, vertex, fragment);
    return {
        Mode: GL_TRIANGLES,
        Program: program,
        Locations: {
            Sampler: gl.getUniformLocation(program, "sampler")!,
            Aspect: gl.getUniformLocation(program, "aspect")!,
            VertexPosition: gl.getAttribLocation(program, "position")!,
            VertexTexCoord: gl.getAttribLocation(program, "texcoord")!,
        },
    };
}
