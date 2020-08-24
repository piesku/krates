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

    varying vec2 vert_texcoord;

    const float aspect = 256.0 / 192.0;

    void main() {
        vec2 uv = vec2(vert_texcoord.x, vert_texcoord.y / aspect + (1.0 - 1.0 / aspect));
        gl_FragColor = texture2D(sampler, uv);
        if (mod(gl_FragCoord.x, 3.0) < 1.0 || mod(gl_FragCoord.y, 3.0) < 1.0) {
            gl_FragColor = vec4(gl_FragColor.rgb * 0.5, 1.0);
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
            VertexPosition: gl.getAttribLocation(program, "position")!,
            VertexTexCoord: gl.getAttribLocation(program, "texcoord")!,
        },
    };
}
