import {link, Material} from "../common/material.js";
import {GL_TRIANGLES} from "../common/webgl.js";
import {PostprocessLayout} from "./layout_postprocess.js";

let vertex = `
    attribute vec3 B;
    attribute vec2 C;
    varying vec2 D;

    void main(){
        gl_Position=vec4(B,1.);
        D=C;
    }
`;

let fragment = `
    precision mediump float;

    uniform sampler2D A;

    varying vec2 D;

    void main(){
        // Adjust the UVs to account for the 256x192 screen.
        gl_FragColor=texture2D(A,vec2(D.x,D.y*.75+.125));
    }
`;

export function mat1_postprocess(gl: WebGLRenderingContext): Material<PostprocessLayout> {
    let program = link(gl, vertex, fragment);
    return {
        Mode: GL_TRIANGLES,
        Program: program,
        Locations: {
            Sampler: gl.getUniformLocation(program, "A")!,
            VertexPosition: gl.getAttribLocation(program, "B")!,
            VertexTexCoord: gl.getAttribLocation(program, "C")!,
        },
    };
}
